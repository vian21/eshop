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