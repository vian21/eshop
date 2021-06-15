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