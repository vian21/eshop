<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['tel'])) {
    include '../../config.php';
    include '../../functions.php';

    $id = $_SESSION['id'];
    $tel = sanitize($_POST['tel']);

    $update = $connect->query("UPDATE users set tel='$tel' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
