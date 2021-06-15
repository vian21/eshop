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