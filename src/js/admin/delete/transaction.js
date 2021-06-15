async function deleteTransaction(id) {
    if (confirm("Are you sure to delete order!")) {

        loading();
        var url = app_url + "modules/admin/delete/transaction.php";
        $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    fetchOrders(0, true);
                    fetchOrders(1);
                } else {
                    alert("Failed to delete transaction!");
                }
            }
        })
    }
}