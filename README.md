# Online shopping Web Application

This is a php online shopping web application

# Setting up

### 1. Create a database on your server with whichever name

### 2. Import **'db.sql'** (which is in the main directory) into your database

### 3. change configuration files
```php
<?php
//Configuration file

/**
 * Establish database connection
 */
$connect = mysqli_connect('DATABASE_HOS', 'DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE _NAME');

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
first change the default admin credentials in '**/modules/createadmin.php**'

```php
<?php

/**
 * By default, this file is disabled for security purposes
 * To be used only once to create an admin and then disable it again(make it false)
 */
$enabled = true;     //set this to true

if ($enabled) {
    include 'config.php';

    $name = "Admin";                        //Admin's name
    $email = "admin@gmail.com";            //Admin's email to be used for login
    $password = "123";                     //Admin password
```

goto **webstite_url/modules/createadmin.php**

### 4. Configurations

### To change default images for products and user
```php

//image storage
$upload_folder = $app_url . "src/img/uploaded/";
$product_default = $upload_folder . "../product.jpeg";

//user
$user_icon = $app_url . "src/img/user.png";

```
#### service worker
In order for your site to be fast, use a service worker to cache files 
Goto src/js/sw.js
```js
var app_url = "http://localhost/shop/";     //change this to ur website url
```

### Now users can successfully use your product

# Thank you 😇

## For Jesus, I code
### Patrick Igiraneza
