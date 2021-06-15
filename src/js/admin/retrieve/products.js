/**
 * function to fetch products
 */
async function fetchProducts(render = false) {
    var url = app_url + "modules/admin/retrieve/products.php";
    await $.ajax({
        url: url,
        success: function (response) {
            if (response !== "") {
                var info = JSON.parse(response);
                all_products = info;
                if (render == true) {
                    productsTable()
                }
            }
        }
    })
}