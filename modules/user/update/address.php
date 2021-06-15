<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['address'])) {
    include '../../config.php';
    include '../../functions.php';

    $id = $_SESSION['id'];
    $address = sanitize($_POST['address']);

    $update = $connect->query("UPDATE users set home_address='$address' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
