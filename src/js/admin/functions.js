/**
 * Generate all products table
 */
function productsTable() {

    var html = "<button class=new id=new>New</button><br><br>"
    html += "<table id=products_table><tr><th>#</th><th>Image</th><th>Name</th><th>Quantity</th><th></th><th></th></tr>";

    if (all_products.length !== 0) {
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

    } else {
        html = "<h4>No products found!</h4>"
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
    if (data !== undefined && data.length !== 0) {
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
    } else {
        table = '<h4>No orders<h4>'
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

            var url = "https://maps.google.com/?daddr=" + latitude + ',' + longitude + "&z=13";

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
    if (categories.length !== 0) {
        var options = "";

        for (var i = 0; i < categories.length; i++) {
            options += "<option value=" + categories[i]['id'] + ">" + categories[i]['name'] + "</option>"
        }
        return options;
    }else{
        return "<option>No categories</option>"
    }
}

function categoriesTable() {
    var html = "<button class=new id=create>New</button><br><br>"
    html += "<table><tr><th></th><th>Name</th><th></th><th></th></tr>";
    $("#desk").html(html)

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
    } else {
        html = "<h4>No categories</h4>"
    }

    //clear desktop
    $("#desk").html(html);
    $("#desk").css('display', 'block');

    //delete category
    $(".delete").click(function () {
        var id = $(this).attr('id');

        deleteCategory(id);
    })

    //edit category form
    $(".edit").click(function () {
        var position = $(this).attr('id');
        editCategoryForm(position);
    })

    //new category form
    $("#create").click(function () {
        event.preventDefault();

        newCategoryForm();
    })
}

