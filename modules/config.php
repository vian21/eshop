<?php
//Configuration file

/**
 * Establish database connection
 */
$connect = mysqli_connect('localhost', 'root', '', 'shop');

/**Configurations */

/** Website url */
$app_url = "http://localhost/shop/";   

/** App name */
$app_name = "Eshop";

/**App description */
$app_description = "Online shopping app";
$app_email = "";
$app_password = "";

/**App logo */
$app_icon = $app_url . "src/img/logo.png";

$date = date('Y-m-d');

//image storage
$upload_folder = $app_url . "src/img/uploaded/";
$product_default = $upload_folder . "../product.jpeg";

//user
$user_icon = $app_url . "src/img/user.png";

//developer information
$dev_name = "Patrick Igiraneza";                      //App developer name
$dev_mail = "igiranezapatrick31@gmail.com";           //App developer email
$dev_tel = "";
$dev_url = "https://myblogpat.000webhostapp.com";     //Developer personal website

//if you want to reduce price of your clients using a set price or algorithm
$reduction = null;
