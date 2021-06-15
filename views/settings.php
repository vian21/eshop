<?php include '../modules/config.php' ?>

<style>
    #container {
        width: 100%;
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

    button {
        border: 0;
        border-radius: 3px;
        color: white;
        background-color: #428bca;
        margin-top: 5px;
    }



    #submit {
        width: 250px;
        text-decoration: none;
        font-size: 15px;
        height: 45px;
        height: 45px;

        font-family: Arial, Helvetica, sans-serif;
    }
</style>

<body>
    <div id="container">
        <center>
            <form enctype="multipart/form-data" id="form">

                <img src="" alt="img" id="img">
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
            </form>
    </div>
    </center>
</body>
<script>
    $('document').ready(function() {

        /**
         * Append user data into form
         */
        if(userImage==''){
            $('#img').attr('src', user_icon);
        }
        else{
            $('#img').attr('src', app_url+"src/img/uploaded/"+userImage);
        }
        $("#name").val(userName);
        $("#email").val(userEmail);
        $("#tel").val(userTel);
        $("#shipping_address").val(home_address);

        /**
         * Changing shipping address
         */
        $(".ship").click(function() {
            event.preventDefault();

            if (current_location == '') {
                alert("Reload page and allow site to get current position!");
            } else {

                shipping_address = current_location;
                $("#shipping_address").val(current_location);
                updateAddress(current_location);
            }



        })

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#img').attr('src', e.target.result);

                }
                reader.readAsDataURL(input.files[0]);

                var image = $("#imgChoose")[0].files[0];
                updateImage(image);
            }
        }


        //If user selects an image
        $("#imgChoose").change(function() {
            readURL(this);
        });

        $("#name").change(function() {
            if ($(this).val() == '') {
                alert("Please enter user name!")
            } else {
                removeMsg();
                updateName($(this).val())
            }
        })

        $("#email").change(function() {
            if ($(this).val() == '') {
                alert("Please enter email address!")
            } else {
                removeMsg();
                updateEmail($(this).val())
            }
        })

        $("#tel").change(function() {
            if ($(this).val() == '') {
                alert("Please enter telephone number!")
            } else {
                removeMsg();
                updateTel($(this).val())
            }
        })

        $("#shipping_address").change(function() {
            if ($(this).val() == '') {
                alert("Please enter address!")
            } else {
                removeMsg();
                updateAddress($(this).val())
            }
        })

        $("#password").change(function() {
            if ($(this).val() == '') {
                alert("Please enter a password!")
            } else {
                removeMsg();
                updatePassword($(this).val())
            }
        })

    })
</script>