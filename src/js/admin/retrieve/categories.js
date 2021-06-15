/**
 * function to fetch categories
 */
async function fetchCategories(render = false) {
    var url = app_url + "modules/admin/retrieve/categories.php";
    await $.ajax({
        url: url,
        success: function (response) {
            if (response !== "") {
                var info = JSON.parse(response);
                categories = info;

                if (render == true) {
                    categoriesTable();
                }
            }
        }
    })
}