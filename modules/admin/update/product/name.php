<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['name'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $id = sanitize($_POST['id']);
    $name = sanitize($_POST['name']);

    $update = $connect->query("UPDATE products set name='$name' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
