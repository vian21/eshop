function deleteCategory(id) {
    var url = app_url + "modules/admin/delete/category.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id
        },
        success: function (response) {
            if (response == 'ok') {
                loading();

                fetchCategories(true);

                alert("Category deleted!");
                
                deleteModal();
            } else {
                alert("Failed to delete category")
            }
        }
    })
}