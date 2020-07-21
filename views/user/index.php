<?php
$user_id = $_SESSION['id'];
$user_type = $_SESSION['type'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <?php include 'modules/config.php' ?>
    <?php include 'modules/functions.php' ?>


    <?php include 'modules/staticFiles.php' ?>

    <title>Login</title>
</head>

<body>
    <!-- The fixed navbar -->
    <div id="menu">
        <div id="navbarImage">
            <img src="src/img/uploaded/<?php echo fetchImage($user_id); ?>" alt="" onclick="pop()">
        </div>
        <div id="navbarSearch">
            <input type="text" name="search" id="inputBox">
        </div>
        <div class='drop-settings'>
            <span class="settings"></span>
            <div class="dropdown-content">
                <a href="<?php echo $app_url; ?>settings.php">Settings</a>
                <a href="<?php echo $app_url; ?>about.html">About</a>
                <a href="<?php echo $app_url; ?>modules/logout.php">Logout</a>
            </div>
        </div>
    </div>
</body>
<script>
    var userId = <?php echo $user_id; ?>;
    var userType = <?php echo $user_type; ?>;

    <?php echo compressCodeIn("src/js/user/retrieve/") ?>
    <?php echo compressCodeIn("src/js/user/create/") ?>
</script>

</html>