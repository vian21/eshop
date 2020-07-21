async function fetchCategoricalProducts() {
    var url = app_url + "modules/user/retrieve/categorical_products.php";
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