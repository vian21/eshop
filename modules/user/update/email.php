<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['email'])) {
    include '../../config.php';
    include '../../functions.php';

    $id = $_SESSION['id'];
    $email = sanitize($_POST['email']);

    $update = $connect->query("UPDATE users set email='$email'  WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
