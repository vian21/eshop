<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['password'])) {
    include '../../config.php';
    include '../../functions.php';

    $id = $_SESSION['id'];
    $password = password_hash(sanitize($_POST['password']), PASSWORD_DEFAULT);

    $update = $connect->query("UPDATE users set password='$password' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
