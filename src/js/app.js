//admin
var deliveredProducts = [];
var undelivered = [];

//user
var userName = '';
var userImage = '';
var all_products = [];
var categories = [];
var categorical_products = [];
var home_address = '';
var current_location = '';


async function fetchAllProducts() {
    var url = app_url + "modules/user/retrieve/all_products.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
        },
        success: function (response) {
            /**
            * [0] : all products array
            * [1] : categories array
            */
            var data = JSON.parse(response);

            all_products = data[0];
            categories = data[1];

            fetchCategoricalProducts();

            //generate tabs
            tabs();

            //render all products frame
            productsRenderer(all_products);
            
            return true;
        }
    })
}
async function fetchCategoricalProducts() {
    var url = app_url + "modules/user/retrieve/categorical_products.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
        },
        success: function (response) {
            var data = JSON.parse(response);
            categorical_products = data;
            return true;
        }
    })
}

async function order(id, quantity, shipping_address) {
    var url = app_url + "modules/user/create/order.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            user: userId,
            quantity: quantity,
            shipping_address: shipping_address
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchAllProducts();
                alert("order Made! It will be delivered as soon as possible");
            } else {
                alert("Failed to make order! Reload page!")
            }
        }
    })
}
/**
* function to fetch categories
*/
async function fetchCategories(render = false) {
    var url = app_url + "modules/admin/retrieve/categories.php";
    await $.ajax({
        url: url,
        success: function (response) {
            if (response !== "") {
                var info = JSON.parse(response);
                categories = info;
                if (render == true) {
                    categoriesTable();
                }
            }
        }
    })
}
/**
* function to fetch orders
* @param type
* 0 : undelivered
* 1 : Delivered
*/
async function fetchOrders(type, render = false) {
    var url = app_url + "modules/admin/retrieve/orders.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            type: type
        },
        success: function (response) {
            if (response !== "") {
                var data = JSON.parse(response);
                //undelivered
                if (type == 0) {
                    undelivered = data;
                    //render as table
                    if (render == true) {
                        orderTable(undelivered);
                    }
                }
                //delivered
                if (type == 1) {
                    deliveredProducts = data;
                    //render as table
                    if (render == true) {
                        orderTable(deliveredProducts);
                    }
                }
            } else {
                if (type == 0) {
                    undelivered = '';
                    //render as table
                    if (render == true) {
                        orderTable(undelivered);
                    }
                } if (type == 1) {
                    deliveredProducts = '';
                    //render as table
                    if (render == true) {
                        orderTable(deliveredProducts);
                    }
                }
            }
        }
    })
}
/**
* function to fetch products
*/
async function fetchProducts(render = false) {
    var url = app_url + "modules/admin/retrieve/products.php";
    await $.ajax({
        url: url,
        success: function (response) {
            if (response !== "") {
                var info = JSON.parse(response);
                all_products = info;
                if (render == true) {
                    productsTable()
                }
            }
        }
    })
}
function newCategoryForm() {
    var form = "<div class=modal><form>";
    form += "<h5>Name</h5>"
    form += "<input id=name type=text><br>";
    form += "<button id=save class=new>Create</button>";
    form += "<button id=cancel class=delete>Cancel</button>";
    form += "</form></div>";
    $('body').append(form);
    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    });
    $("#save").click(function () {
        event.preventDefault();
        var name = $("#name").val();
        if (name == '') {
            alert("Enter a category name!")
        } else {
            newCategory(name);
        }
    })
}
function newCategory(name) {
    var url = app_url + "modules/admin/create/category.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            name: name
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchCategories(true);
                alert("Category created!");
                deleteModal();
            } else {
                alert("Failed to save data!");
            }
        }
    })
}
function newProductForm() {
    var html = "<div class=modal>";
    html += "<form>\
<h5>Image</h5>\
<input type=file id=image>\
<h5>Name</h5>\
<input id=name type=text><br>\
<h5>Description</h5>\
<input type=text id=description><br>\
<h5>Quantity</h5>\
<input type=number id=quantity>\
<h5>Price</h5>\
<input type=number id=price>\
<h5>Category</h5>\
<select id=category></select><br>\
<button class=new id=create>Create</button>\
<button class=delete id=cancel>cancel</button>"
    html += "</div>";
    $('body').append(html);
    $("#category").html(categoryOptions());
    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    })
    $("#create").click(function () {
        event.preventDefault();
        var image = $("#image")[0].files[0];
        var name = $("#name").val();
        var description = $("#description").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var category = $("#category").val();
        var validName, validDesc, validPrice, validQuant = false;
        if (image == undefined) {
            image = '';
        }
        if (name == '') {
            alert("Enter name!");
        }
        else {
            validName = true
        }
        if (description == '') {
            alert("Enter description!");
        }
        else {
            validDesc = true
        } if (price == '') {
            alert("Enter price!");
        } else {
            validPrice = true
        }
        if (quantity == '') {
            alert("Enter quantity!");
        }
        else {
            validQuant = true
        }
        if (validName && validDesc && validPrice && validQuant) {
            var form = new FormData();
            form.append('image', image);
            form.append('name', name);
            form.append('description', description);
            form.append('price', price);
            form.append('quantity', quantity);
            form.append('category', category);
            newProduct(form)
        }
    })
}
/**
*
* Create Product
*/
function newProduct(form) {
    var url = app_url + "modules/admin/create/product.php";
    $.ajax({
        url: url,
        method: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form,
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchProducts(true);
                alert("Product inserted!")
                deleteModal();
            } else {
                alert("Failed to create product!")
            }
        }
    })
}
function editCategoryForm(position) {
    var category = categories[position];
    var id = category['id'];
    var name = category['name'];
    var form = "<div class=modal><form>";
    form += "<h5>Name</h5>"
    form += "<input id=name type=text value=" + name + "><br>";
    form += "<button id=update>Save</button>";
    form += "<button id=cancel class=delete>Cancel</button>";
    form += "</form></div>";
    $('body').append(form);
    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    });
    $("#update").click(function () {
        event.preventDefault();
        name = $("#name").val();
        if (name == '') {
            alert("Enter category name");
        } else {
            updateCategory(id, name);
        }
    })
}
function updateCategory(id, name) {
    var url = app_url + "modules/admin/update/category.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            name: name
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchCategories(true);
                alert("Data saved successfully");
                deleteModal();
            } else {
                alert("Failed to save data");
            }
        }
    })
}
async function deliveryDone(id) {
    if (confirm("Job done?")) {
        loading();
        var url = app_url + "modules/admin/update/done.php";
        await $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    fetchOrders(0, true);
                    fetchOrders(1);
                } else {
                    alert("Failed to save data!")
                }
            }
        })
    }
}

function updateProductCategory(id, category) {
    var url = app_url + "modules/admin/update/product/category.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            category: category,
        },
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                $("#category").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!");
            }
        }
    })
}
function updateProductDescription(id, description) {
    var url = app_url + "modules/admin/update/product/description.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            description: description,
        },
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                $("#description").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!");
            }
        }
    })
}
function updateProductImage(id, image, oldImage) {
    var url = app_url + "modules/admin/update/product/image.php";
    var form = new FormData();
    form.append('id', id);
    form.append('image', image);
    //old image so that it can be deleted
    form.append('old', oldImage);
    $.ajax({
        url: url,
        method: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form,
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                fetchOrders(0);
                fetchOrders(1);
                $("#imgChoose").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
function updateProductName(id, name) {
    var url = app_url + "modules/admin/update/product/name.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            name: name,
        },
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                $("#name").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!");
            }
        }
    })
}

function updateProductPrice(id, price) {
    var url = app_url + "modules/admin/update/product/price.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            price: price,
        },
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                $("#price").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!");
            }
        }
    })
}
function updateProductQuantity(id, quantity) {
    var url = app_url + "modules/admin/update/product/quantity.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            quantity: quantity,
        },
        success: function (response) {
            if (response == 'ok') {
                fetchProducts();
                $("#quantity").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!");
            }
        }
    })
}

function deleteCategory(id) {
    var url = app_url + "modules/admin/delete/category.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchCategories(true);
                alert("Category deleted!");
                deleteModal();
            } else {
                alert("Failed to delete category")
            }
        }
    })
}

async function deleteProduct(id) {
    var url = app_url + "modules/admin/delete/product.php";
    if (confirm("Are you sure to delete product?")) {
        await $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    loading();
                    fetchProducts(true);
                    alert("Product Deleted!");
                } else {
                    alert("Failed to delete products");
                    productsTable();
                }
            }
        })
    }
}
async function deleteTransaction(id) {
    if (confirm("Are you sure to delete order!")) {
        loading();
        var url = app_url + "modules/admin/delete/transaction.php";
        $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    fetchOrders(0, true);
                    fetchOrders(1);
                } else {
                    alert("Failed to delete transaction!");
                }
            }
        })
    }
}

$('document').ready(function () {
    /**
    * JS functions for the drop down menu in navbar
    */
    //handle onclick somewhere else other that the dropdown -->hide
    const $menu = $('.dropdown-content');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) // if the target of the click isn't the container...
            &&
            $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $menu.css("display", "none");
        }
    });
    //Ontouch for touchscreens -->close dropdown
    $(document).on('touchend', function (e) {
        if (!$menu.is(e.target) // if the target of the click isn't the container...
            &&
            $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $menu.css("display", "none");
        }
    });
    //activate dropdown
    $(".settings").click(function () {
        $(".dropdown-content").css("display", "block")
    })
    /**
    * Onclick settings option in menu
    */
    $("#settings").click(function () {
        event.preventDefault();
        settings();
    })
    /**
    * About button
    */
    $("#about").click(function () {
        event.preventDefault();
        about();
    })
    $("#cart").click(function () {
        event.preventDefault();
        cart();
    })
    getLocation();
})
/**
* image viewer
*/
function pop() {
    //Popup image function
    var imgLocation = $(event.target).attr("src");
    $("#popupImg").attr("src", imgLocation);
    $("#popup").toggle();
    //Image popup close
    $("#closePopup").click(function () {
        $("#popup").hide();
    })
}
/**
* Checks that location permission has been granted then gets the position coordinates
*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
/**
*
* Get user current location
* Returns current location
* @format latitude , longitude
* @returns location coordinates
*/
function showPosition(position) {
    var location = '';
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    location = latitude + ',' + longitude;
    current_location = location;
}
/**
* Fetch User information
*/
async function fetchUserInfo() {
    var url = app_url + "modules/user/retrieve/info.php"
    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: userId
        },
        success: function (response) {
            if (response !== '') {
                var info = JSON.parse(response);
                userName = info['name'];
                userEmail = info['email'];
                userTel = info['tel'];
                userImage = info['image'];
                home_address = info['home_address'];
            }
        }
    })
}

function tabs() {
    var html = "<button id='all' class='tab'>All</button>";
    for (var i = 0; i < categories.length; i++) {
        html += "<button id=" + i + " class='tab'>" + categories[i]['name'] + "</button>"
    }
    $("#categories").html(html);
    $(".tab").click(function () {
        var position = $(this).attr('id');
        if (position == 'all') {
            productsRenderer(all_products);
        } else {
            productsRenderer(categorical_products[position])
        }
    })
}

function orderForm(data) {
    var html = "";
    html += "<div id=orderForm>"
    /**
    * if image is null use the default image for products
    */
    var image = data['image'];
    if (image == "") {
        image = product_default;
    } else {
        image = upload_folder + image;
    }
    html += "<center><img src=" + image + " onclick=pop()></center><br>";
    html += "<div>Left: <span>" + data['quantity'] + "</span></div>";
    html += "<p>" + data['description'] + "</p>";
    var left = parseInt(data['quantity']);
    html += "<div>Left: <span>" + left + "</span></div>";
    var price = data['price'];
    html += "<div>Price: <span>" + price + "</span></div>";
    var quantity = 1;
    html += "<div>Quantity:<input type=number id=quantity value=1></div>";
    var shipping_address = home_address;
    html += "<div>Shipping address: <input type=text value='" + home_address + "' id=shipping_address></div>";
    html += "<button id=shipHome class=ship>Use Home address</button><button id=shipCurrent class=ship>Use current location</button>"
    var total = price * quantity;
    html += "<div>Total: <span id=total>" + total + "</span></div>";
    html += "<button id=order>Order</button>";
    html += "</div>"
    /**
    * Write data to dom
    */
    $("#desk").html(html)
    /**
    * Listen for change in quantity
    */
    $("#quantity").change(function () {
        quantity = $("#quantity").val()
        if (quantity == "" || quantity == 0) {
            quantity = 1;
        }
        //recalculate total
        total = price * quantity;
        //change total
        $("#total").html(total)
    })
    /**
    * Changing shipping address
    */
    $(".ship").click(function () {
        event.preventDefault();
        var id = $(this).attr('id');
        if (id == "shipHome") {
            shipping_address = home_address;
            $("#shipping_address").val(home_address)
        }
        if (id == "shipCurrent") {
            shipping_address = current_location;
            $("#shipping_address").val(current_location)
        }
    })
    $("#order").click(function () {
        if (quantity <= left) {
            order(data['id'], quantity, shipping_address)
        } else {
            alert("There are not enough items in stock!")
        }
    })
}
/**
* Function to clear body while request is being made
* @returns Loading ...
*/
function loading() {
    $('#categories').html();
    $('#desk').html("Loading ...");
}
/**
* Seach for a product
*/
function searchProduct(data) {
    var url = app_url + "modules/user/search/product.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            description: data
        },
        success: function (response) {
            if (response !== '') {
                var results = JSON.parse(response);
                productsRenderer(results);
            } else {
                $("#desk").html("No results!");
            }
        }
    })
}
/**
* Function to clear desk div and display about page
*/
function about() {
    loading();
    $.ajax({
        url: app_url + "views/about.php",
        success: function (response) {
            $("#desk").html(response)
        }
    })
}
/**
* Function clears desk and append a form to update user's info
*/
function settings() {
    loading();
    $.ajax({
        url: app_url + "views/settings.php",
        success: function (response) {
            $("#desk").html(response)
        }
    })
}
/**
* user cart -> orders $ delivered
*/
function cart() {
    loading();
    $.ajax({
        url: app_url + "views/user/cart.php",
        success: function (response) {
            $("#desk").html(response)
        }
    })
}
/**
* Function to remove msg div
*/
function removeMsg() {
    $("#msg").remove();
}
//user functions
/**
* Update image
*/
function updateImage(image) {
    var url = app_url + "modules/user/update/image.php";
    var form = new FormData();
    form.append('image', image);
    //old image so that it can be unset
    form.append('old', userImage);
    $.ajax({
        url: url,
        method: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form,
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#imgChoose").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Update user name
*/
async function updateName(data) {
    var url = app_url + "modules/user/update/name.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            name: data
        },
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#name").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Update user email
*/
async function updateEmail(data) {
    var url = app_url + "modules/user/update/email.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            email: data
        },
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#email").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Update user tel
*/
async function updateTel(data) {
    var url = app_url + "modules/user/update/tel.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            tel: data
        },
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#tel").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Update user password
*/
async function updatePassword(data) {
    var url = app_url + "modules/user/update/password.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            password: data
        },
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#password").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Update user address
*/
async function updateAddress(data) {
    var url = app_url + "modules/user/update/address.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            address: data
        },
        success: function (response) {
            if (response == 'ok') {
                fetchUserInfo();
                $("#shipping_address").after("<div id='msg'>Data saved successfully!</div>");
                $("#msg").fadeIn().delay(2000).fadeOut().delay(200);
            } else {
                alert("Failed to save data!")
            }
        }
    })
}
/**
* Delete modal div
*/
function deleteModal() {
    $(".modal").remove();
}
$(document).ready(function () {
    if (typeof logged !== 'undefined' && userType == 0) {
        fetchUserInfo();
        fetchOrders(0, true)
        fetchOrders(1).then(function () {
            $("#orders").click(function () {
                orderTable(undelivered);
            })
            $("#delivered").click(function () {
                orderTable(deliveredProducts);
            })
        })
        fetchProducts().then(function () {
            $("#products").click(function () {
                productsTable();
            })
        })
        fetchCategories().then(function () {
            $("#categoryTab").click(function () {
                categoriesTable();
            })
        })
    }
})

$(document).ready(function () {
    if (typeof logged !== 'undefined' && userType == 0) {
        fetchUserInfo();
        fetchOrders(0, true)
        fetchOrders(1).then(function () {
            $("#orders").click(function () {
                orderTable(undelivered);
            })
            $("#delivered").click(function () {
                orderTable(deliveredProducts);
            })
        })
        fetchProducts().then(function () {
            $("#products").click(function () {
                productsTable();
            })
        })
        fetchCategories().then(function () {
            $("#categoryTab").click(function () {
                categoriesTable();
            })
        })
    }
})
$('document').ready(function () {
    if (typeof logged !== 'undefined' && userType == 1) {   /**
* fetch data via ajax
*/
        //app info
        fetchUserInfo();
        getLocation();
        loading();
        fetchAllProducts();
        /**
        * user search
        */
        $("#inputBox").change(function () {
            event.preventDefault();
            if ($(this).val() !== "") {
                loading();
                searchProduct($(this).val());
            }
        })
    }
})/**
* Generate all products table
*/
function productsTable() {
    var html = "<button class=new id=new>New</button><br><br>"
    html += "<table id=products_table><tr><th>#</th><th>Image</th><th>Name</th><th>Quantity</th><th></th><th></th></tr>";
    if (all_products !== '') {
        var data = all_products;
        var number = 0
        for (var i = 0; i < data.length; i++) {
            number++;
            html += "<tr>"
            html += "<td>" + number + "</td>"
            var image = data[i]['image'];
            if (image == '') {
                image = product_default;
            } else {
                image = upload_folder + image;
            }
            html += "<td><img src=" + image + " onclick=pop()></td>";
            html += "<td>" + data[i]['name'] + "</td>";
            html += "<td>" + data[i]['quantity'] + "</td>"
            html += "<td><button id=" + i + " class=edit>Edit</button></td>";
            html += "<td><button id=" + data[i]['id'] + " class=delete>Delete</button></td>";
            html += "</tr>"
        }
    }
    html += "</table>"
    $("#desk").html(html);
    $("#desk").css('display', 'block')
    $(".edit").click(function () {
        var id = $(this).attr('id');
        editProduct(id);
    })
    $(".delete").click(function () {
        var id = $(this).attr('id');
        deleteProduct(id);
    })
    $("#new").click(function () {
        newProductForm();
    })
}
/**
* generate a transaction table
*/
function orderTable(data) {
    var table = "<table><tr>\
<th></th>\
<th>#</th>\
<th>Name</th>\
<th>Tel</th>\
<th>Item</th>\
<th>Quantity</th>\
<th>Total</th>\
</tr>";
    var number = 0;
    if (data !== undefined) {
        for (var i = 0; i < data.length; i++) {
            number++;
            table += "<tr>";
            table += "<td><button id=" + i + " class=order>View</button></td>";
            table += "<td>" + number + "</td>";
            table += "<td>" + data[i]['name'] + "</td>";
            table += "<td>" + data[i]['tel'] + "</td>";
            table += "<td>" + data[i]['product_name'] + "</td>";
            table += "<td>" + data[i]['quantity'] + "</td>";
            var total = parseInt(data[i]['total']);
            table += "<td>" + total.toLocaleString() + "</td>";
            table += "</tr>"
        }
        table + "</table>";
    }
    $("#desk").html(table)
    $(".order").click(function () {
        event.preventDefault();
        var id = $(this).attr('id');
        orderInfo(data[id]);
    })
}
/**
*
* Function to generate info about order and action such as deliver,delete,...
*/
function orderInfo(data) {
    var html = "";
    if (data !== '') {
        //map
        html += "<div class=container></div>"
        //user info
        html += "<div class=container>";
        if (data['image'] == '') {
            var customerImage = user_icon;
        } else {
            var customerImage = upload_folder + data['image']
        }
        html += "<img id=customer src=" + customerImage + " onclick=pop()>";
        html += "<div>Name: <span>" + data['name'] + "</span></div>";
        html += "<div>Tel: <span>" + data['tel'] + "</span></div>";
        html += "<div>Email: <span>" + data['email'] + "</span></div>";
        html += "</div>";
        //item info
        html += "<div class=container>";
        if (data['product_image'] == '') {
            var productImage = product_default;
        } else {
            var productImage = upload_folder + data['product_image']
        }
        html += "<center><img id=product src=" + productImage + " onclick=pop()></center>";
        html += "<div>Name: <span>" + data['product_name'] + "</span></div>";
        html += "<div>Description: <span>" + data['description'] + "</span></div>";
        html += "<div>Quantity: <span>" + data['quantity'] + "</span></div>";
        html += "<div>Total: <span>" + parseInt(data['total']).toLocaleString() + "</span></div>";
        html += "</div>";
        //if the order is not delivered
        html += "<div class=container><center>";
        if (data['status'] == 0 && userType == 0) {
            html += "<button id=showmap class='new actions'>Go</button><br>";
            html += "<button id=doneButton class=actions>Delivered</button><br>";
            html += "<button id=deleteOrder class='delete actions'>Delete</button>";
        }
        html += "</center></div>";
        $("#desk").html(html);
        $("#desk").css('display', 'block');
        $("#showmap").click(function () {
            var coordinates = data['shipping_address'].split(',');
            var latitude = coordinates[0];
            var longitude = coordinates[1];
            var url = "https://www.google.com/maps?z=12&t=m&q=loc:" + latitude + '+' + longitude;
            window.open(url, '_blank');
        })
        $("#doneButton").click(function () {
            deliveryDone(data['id']);
        })
        $("#deleteOrder").click(function () {
            deleteTransaction(data['id']);
        })
    }
}
/**
* Edit product
*/
function editProduct(id) {
    loading();
    $.ajax({
        url: app_url + "views/admin/product.php",
        method: "post",
        data: {
            id: id
        },
        success: function (response) {
            $("#desk").html(response);
        }
    })
}
/**
* Generate category options
*/
function categoryOptions() {
    if (categories !== '') {
        var options = "";
        for (var i = 0; i < categories.length; i++) {
            options += "<option value=" + categories[i]['id'] + ">" + categories[i]['name'] + "</option>"
        }
        return options;
    }
}
function categoriesTable() {
    var html = "<button class=new id=create>New</button><br><br>"
    html += "<table><tr><th></th><th>Name</th><th></th><th></th></tr>";

    if (categories.length !== 0) {
        var number = 0;
        for (var i = 0; i < categories.length; i++) {
            number++;
            html += "<tr>";
            html += "<td>" + number + "</td>"
            html += "<td>" + categories[i]['name'] + "</td>"
            html += "<td><button id=" + i + " class=edit>Edit</button></td>"
            html += "<td><button id=" + categories[i]['id'] + " class=delete>Delete</button></td>"
            html += "</tr>"
        }
    }
    $("#desk").html(html)
    $("#desk").css('display', 'block');
    $(".delete").click(function () {
        var id = $(this).attr('id');
        deleteCategory(id);
    })
    $(".edit").click(function () {
        var position = $(this).attr('id');
        editCategoryForm(position);
    })
    $("#create").click(function () {
        event.preventDefault();
        newCategoryForm();
    })
}
