<?php
session_start();
if (isset($_SESSION['id']) && isset($_POST['category'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $id = sanitize($_POST['id']);
    $category = sanitize($_POST['category']);

    $update = $connect->query("UPDATE products set category=$category WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
