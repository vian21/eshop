<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['price'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $id = sanitize($_POST['id']);
    $price = sanitize($_POST['price']);

    $update = $connect->query("UPDATE products set price=$price WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
