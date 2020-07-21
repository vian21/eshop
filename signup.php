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

    #submit {
        width: 100%;
        color: white;
        height: 45px;

        background-color: #428bca;
    }

    button {
        border: 0;
    }

    #signup {
        width: 250px;
        text-decoration: none;
        font-size: 15px;
        height: 45px;
        background-color: red;
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

            <h5>Password</h5>
            <input type="password" name="password" id="password" autocomplete="off" required><br><br>

            <h5>Home address</h5>
            <input type="text" name="address" id="address" autocomplete="off">

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

        $("#submit").click(function() {
            event.preventDefault();

            var fd = new FormData();
            var imgFile = $("#imgChoose")[0].files[0];
            var name = $("#name").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var address = $("#address").val();

            fd.append('name', name);
            fd.append('email', email);
            fd.append('password', password);
            fd.append('img', imgFile);
            fd.append('address', address);

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