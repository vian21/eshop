function editCategoryForm(position) {
    var category = categories[position];
    var id = category['id'];
    var name = category['name'];

    var form = "<div class=modal><form>";

    form += "<h5>Name</h5>"
    form += "<input id=name type=text value=" + name + "><br>";
    form += "<button id=update>Save</button>";
    form += "<button id=cancel class=delete>Cancel</button>";

    form += "</form></div>";

    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    });

    $("#update").click(function () {
        event.preventDefault();

        name = $("#name").val();

        if (name == '') {
            alert("Enter category name");
        } else {
            updateCategory(id, name);
        }
    })

}

function updateCategory(id, name) {
    var url = app_url + "modules/admin/update/category.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            name: name
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchCategories(true);
                alert("Data saved successfully");
                deleteModal();

            } else {
                alert("Failed to save data");
            }
        }
    })
}