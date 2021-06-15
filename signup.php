<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <?php include 'modules/config.php' ?>

    <?php include 'modules/staticFiles.php' ?>

    <title>Sign Up</title>
</head>
<style>
    body {
        margin: 0;
        background-color: #ffff;
        font-family: Arial, Helvetica, sans-serif;
    }

    form {
        width: 250px;
        text-align: center;
        padding-top: 100px;
    }

    form input {
        width: 100%;
        height: 45px;
        font-family: Montserrat-Bold;

    }

    input:required {
        border-left-color: palegreen;
    }

    input:invalid {
        border-left-color: salmon;
    }

    #submit {
        border: 0;
        border-radius: 3px;
        color: white;
        background-color: #428bca;
        margin-top: 5px;
        width: 250px;
        text-decoration: none;
        font-size: 15px;
        height: 45px;
        height: 45px;

        font-family: Arial, Helvetica, sans-serif;
    }
</style>

<body>
    <center>
        <form enctype="multipart/form-data" id="form">

            <img src="src/img/user.png" alt="img" id="img">
            <input type="file" name="image" id="imgChoose">


            <h5>Name</h5>
            <input type="text" name="name" id="name" autocomplete="off" required><br><br>

            <h5>Email</h5>
            <input type="email" name="email" id="email" required autocomplete="off"><br><br>

            <h5>Telephone number</h5>
            <input type="tel" name="tel" id="tel" required autocomplete="off"><br><br>

            <h5>Password</h5>
            <input type="password" name="password" id="password" autocomplete="off" required><br><br>

            <h5>Home address</h5>
            <input type="text" name="address" id="shipping_address" autocomplete="off">
            <br><br>
            <button id=shipCurrent class=ship>Use current location</button>
            <br>
            <br>

            <button type="submit" name="submit" id="submit">Sign up</button>
            <br>
            <br>
        </form>
    </center>
</body>
<script>
    $(document).ready(function() {

        getLocation();

        /**
         * Changing shipping address
         */
        $(".ship").click(function() {
            event.preventDefault();
            var id = $(this).attr('id');

            if (id == "shipHome") {
                shipping_address = home_address;
                $("#shipping_address").val(home_address)
            }

            if (id == "shipCurrent") {
                shipping_address = current_location;
                $("#shipping_address").val(current_location)
            }
        })

        $("#submit").click(function() {
            event.preventDefault();

            var fd = new FormData();
            var imgFile = $("#imgChoose")[0].files[0];
            if (imgFile == undefined) {
                imgFile = '';
            }
            var name = $("#name").val();
            var email = $("#email").val();
            var tel = $("#tel").val();
            var password = $("#password").val();
            var address = location;

            var validName, validEmail, validPassword, validTel = false;

            if (name == '') {
                alert("Enter User name")
            } else {
                validName = true;
            }

            if (email == '') {
                alert("Enter an email")
            } else {
                validEmail = true;
            }

            if (tel == '') {
                alert("Enter a telephone number from which we will be able to contact you on delivery!")
            } else {
                validTel = true;
            }

            if (password == '') {
                alert("Enter a password")
            } else {
                validPassword = true;
            }
            if (validName == true && validEmail == true && validTel == true && validPassword == true) {
                fd.append('name', name);
                fd.append('email', email);
                fd.append('tel', tel);
                fd.append('password', password);
                fd.append('img', imgFile);
                fd.append('address', current_location);

                $.ajax({
                    method: "post",
                    url: "modules/signup.php",
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function(response) {
                        if (response == "ok") {

                            alert("Account Created!");

                            window.location.replace("login.php");

                        }
                        if (response == "ko") {
                            alert("Failed to create user account")
                        }
                        if (response == "exists") {
                            alert("Email already taken. Use another one!")
                        }
                    }
                })
            }

        })
        //If user selects an image
        $("#imgChoose").change(function() {
            readURL(this);
        });
    });


    //Get the image location and ajax preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>

</html>