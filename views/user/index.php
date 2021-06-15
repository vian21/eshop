<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <?php include 'modules/config.php' ?>
    <?php include 'modules/functions.php' ?>
    <?php include 'modules/staticFiles.php' ?>

    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/main.css">

    <title><?php echo $app_name; ?></title>
</head>

<body>
    <!-- The fixed navbar -->
    <div id="menu">
        <div id="navbarImage">
            <img src="src/img/uploaded/<?php echo fetchImage($user_id); ?>" onclick="pop()">
        </div>
        <div id="navbarSearch">
            <center><input type="text" name="search" id="inputBox"></center>
        </div>
        <div class='drop-settings'>
            <span class="settings"></span>
            <div class="dropdown-content">
                <a href="#" id="settings">Settings</a>
                <a href="#" id="cart">Cart</a>
                <a href="#" id="about">About</a>
                <a href="<?php echo $app_url; ?>modules/logout.php">Logout</a>
            </div>
        </div>
    </div>

    <div id='main'>
        <div id="categories"></div>
        <div id="desk">
        </div>
    </div>
</body>
</html>