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