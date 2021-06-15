async function deliveryDone(id) {
    if (confirm("Job done?")) {
        loading();

        var url = app_url + "modules/admin/update/done.php";

        await $.ajax({
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
                    alert("Failed to save data!")
                }
            }
        })
    }
}