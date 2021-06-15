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