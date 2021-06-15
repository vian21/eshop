<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['description'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $id = sanitize($_POST['id']);
    $description = sanitize($_POST['description']);

    $update = $connect->query("UPDATE products set description='$description' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
