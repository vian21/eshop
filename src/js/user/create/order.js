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