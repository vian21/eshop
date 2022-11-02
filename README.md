# Online shopping Web Application

This is a php online shopping web application

# Setting up

### 1. Create a database on your server with whichever name

### 2. Import **'db.sql'** (which is in the main directory) into your database

### 3. Change configuration files
Configuration file is at **/modules/config.php**.

Insert your database credentials and website url.
```php
<?php
//Configuration file

/**
 * Establish database connection
 */
$connect = mysqli_connect('DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE _NAME');

/**Configurations */

/** 
 * Website url 
 * If on localhost 'http://localhost/[folder_name]/'
 * If online 'https://website_url.com/' with a slash at the end
*/
$app_url = "http://localhost/shop/";                                 
```

### 3. Create an Admin user

In order to create an admin user:
1. Goto **/modules/createadmin.php**.
2. First enable the file .
3. Then change credentials if need be.

```php
<?php

/**
 * By default, this file is disabled for security purposes
 * To be used only once to create an admin and then disable it again(make it false)
 */
$enabled = false;     //set this to true

if ($enabled) {
    include 'config.php';

    $name = "Admin";                        //Admin's name
    $email = "admin@gmail.com";            //Admin's email to be used for login
    $password = "123";                     //Admin password
```

4. Then goto **webstite_url/modules/createadmin.php** in your browser.

### Now the app works
you can start by:
1. Creating product categories
2. Inserting Products

### 4. Other configurations

#### service worker
In order for your site to be fast, use a service worker to cache files.

Goto **src/js/sw.js**
```js
var app_url = "http://localhost/shop/";     //change this to your website url, with a slash at the end.
```

### To change default images for products and user (optional)
```php

//image storage
$upload_folder = $app_url . "src/img/uploaded/";
$product_default = $upload_folder . "../product.jpeg";

//user
$user_icon = $app_url . "src/img/user.png";

```

## **Now users can successfully use your product.**

# Thank you 😇

### Patrick Igiraneza
