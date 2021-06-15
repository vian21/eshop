# Online shopping Web Application

This is a php online shopping web application

# Setting up

## 1. Create a database in your server with which ever name

## 2. Import **'db.sql'** (which is in the main directory) into your database

## 3. Create an Admin user

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

## 4. Configurations

urls
images
service worker

## 5. Signup via the signup page

# Thank you 😇

## For Jesus, I code
