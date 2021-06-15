<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['quantity'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $id = sanitize($_POST['id']);
    $quantity = sanitize($_POST['quantity']);

    $update = $connect->query("UPDATE products set quantity=$quantity WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
