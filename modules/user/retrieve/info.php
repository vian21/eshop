<?php
if (isset($_POST['id'])) {
    include "../../config.php";
    include "../../functions.php";

    $id = $_POST['id'];

    /**
     * Array of all user's info data including hashed password
     * This data should not be sent to a normal user
     */
    $userInfo = fetchUserInfo($id);

    //Array to contain the data to be sent to front end
    $user = array();

    $user['id'] = $userInfo['id'];
    $user['name'] = $userInfo['name'];
    $user['email'] = $userInfo['email'];
    $user['image'] = $userInfo['image'];
    $user['home_address'] = $userInfo['home_address'];

    echoJson($user);
}
