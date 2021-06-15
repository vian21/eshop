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

/**
 * 
 * Render products given as array into the desk div
 * 
 */
function productsRenderer(data) {
    $("#desk").css('display', 'flex')
    var html = "";
    for (var i = 0; i < data.length; i++) {
        var item = "";

        //all cards given same class for css
        item += "<div class='item'>"

        /**
         * if image is null use the default image for products
         */
        var image = data[i]['image'];
        if (image == "") {
            image = product_default;
        } else {
            image = upload_folder + image;
        }
        item += "<center><img src=" + image + " onclick=pop() loading='lazy'></center><br>";

        item += "<center><h5>" + data[i]['name'] + "</h5></center>";
        var description = data[i]["description"].slice(0,400);
        item += "<span class='description'>" + description + "</span>";
        item += "<div class='pricing'>Left: <span class='price'>" + data[i]['quantity'] + "</span></div><br>"
        item += "<div class='pricing'>Price: <span class='price'>" + data[i]['price'] + "</span></div><br>"
        item += "<button class='buy' id=" + i + ">Buy</button>";
        item += "</div>";

        html += item;
    }

    $("#desk").html(html);

    $(".buy").click(function () {
        var position = $(this).attr('id');

        orderForm(data[position]);
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
    html += "<center><img src=" + image + " onclick=pop() loading='lazy'></center><br>";
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
