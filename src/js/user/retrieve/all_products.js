async function fetchAllProducts() {
    var url = app_url + "modules/user/retrieve/all_products.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {

        },
        success: function (response) {
            var data = JSON.parse(response);

            return true;
        }
    })
}