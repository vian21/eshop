async function fetchUserInfo() {
    var url = app_url + "modules/user/retrieve/info.php"
    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: userId
        },
        success: function (response) {
            var info = JSON.parse(response);
            userName = info['name'];
            userImage = info['image'];
            home_address = info['home_address'];
        }
    })
}