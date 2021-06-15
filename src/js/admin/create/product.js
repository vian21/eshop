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