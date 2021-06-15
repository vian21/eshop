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