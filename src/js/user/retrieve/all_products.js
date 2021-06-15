async function fetchAllProducts() {
    var url = app_url + "modules/user/retrieve/all_products.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {

        },
        success: function (response) {
            /**
             * [0] : all products array
             * [1] : categories array
             */
            var data = JSON.parse(response);

            all_products = data[0];
            categories = data[1]

            fetchCategoricalProducts();

            //generate tabs
            tabs();

            //render all products frame
            productsRenderer(all_products);
            return true;
        }
    })
}