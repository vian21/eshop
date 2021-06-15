function newCategoryForm() {
    var form = "<div class=modal><form>";

    form += "<h5>Name</h5>"
    form += "<input id=name type=text><br>";
    form += "<button id=save class=new>Create</button>";
    form += "<button id=cancel class=delete>Cancel</button>";

    form += "</form></div>";

    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    });

    $("#save").click(function () {
        event.preventDefault();

        var name = $("#name").val();

        if (name == '') {
            alert("Enter a category name!")
        } else {
            newCategory(name);
        }
    })
}

function newCategory(name) {
    var url = app_url + "modules/admin/create/category.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            name: name
        },
        success: function (response) {
            if (response == 'ok') {
                loading();
                fetchCategories(true);
                alert("Category created!");
                deleteModal();
            } else {
                alert("Failed to save data!");
            }
        }
    })
}