<?php

/**
 * By default, this file is disabled for security purposes 
 * To be used only once to create an admin and then disable it again(make it false)
 */
$enabled = false;

if ($enabled) {
    include 'config.php';

    $name = "Admin";
    $email = "admin@gmail.com";
    $password = "123";

    //Generate a uniqueID
    $uniqueID = uniqid('', true);

    //Hash the password (encrypt)
    $password = password_hash($password, PASSWORD_DEFAULT);

    $createUser = $connect->query("INSERT INTO users(name,uniqueID,email,password,type) VALUES('$name','$uniqueID','$email','$password',0)");

    if ($createUser) {

        echo "<center><h1>Admin account created!</h1><p>Remember to disable this file to prevent hackers from creating admin accounts themselves!</p></center>";
    } else {
        echo $connect->error;
        echo "<h4>Failed to open admin Account! Check your database credentials in <b>config.php<b/></h4>";
    }
}
