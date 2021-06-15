<?php
//This file creates new users
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
    include 'config.php';
    include 'functions.php';

    $name = sanitize($_POST['name']);
    $address = sanitize($_POST['address']);
    $email = sanitize($_POST['email']);
    $tel = sanitize($_POST['tel']);


    /**
     * 0 : admin
     * 1 : user
     * default 1 unless type is sent via post
     */
    $type = 1;
    if (isset($_POST['type'])) {
        $type = sanitize($_POST['type']);
    }

    //Hash the password
    $password = password_hash(sanitize($_POST['password']), PASSWORD_DEFAULT);

    //img name is empty by default in case the user entered no image
    $imgName = "";

    //Check if email is not taken
    $existingUsers = $connect->query("SELECT email FROM users WHERE email='$email'");

    //if email not already taken
    if (mysqli_num_rows($existingUsers) < 1) {
        //If user set an image
        if (isset($_FILES['img'])) {
            $imgName = $_FILES['img']['name'];
            $location = "../src/img/uploaded/" . $imgName;
            $imgType = pathinfo($location, PATHINFO_EXTENSION);
            $validExt = array('png', 'jpg', 'jpeg');
            /*
            * 'K' : For failed
            * 'O' : For success
            */
            if (in_array(strtolower($imgType), $validExt)) {
                move_uploaded_file($_FILES['img']['tmp_name'], $location);
            }
        }

        //uniqueID
        $uniqueID = uniqid('', true);

        $createUser = $connect->query("INSERT INTO users(name,uniqueID,home_address,email,tel,password,image,type) VALUES('$name','$uniqueID','$address','$email','$tel','$password','$imgName',$type)");

        /*
        * 'O' : For failed
        * 'K' : For success
        */
        if ($createUser) {
            echo "ok";
        } else {
            //echo mysqli_error($connect);

            echo "ko";
        }
    } else {
        echo "exists";  //email already taken
    }
}
/*
 * This code will generate:
 * 'OK' : If user created successfull
 * 'KO' : If failed to create user
 * 'exits' : if email already taken
 */
