<?php
session_start();
if ($_SESSION['type'] == 0 && $_POST['id']) {
    include '../../config.php';
    include '../../functions.php';

    $id = sanitize($_POST['id']);

    $image = fetchProductInfo($id)['image'];

    $delete = $connect->query("DELETE FROM products WHERE id=$id");
    $delete = $connect->query("DELETE FROM transactions WHERE product_id=$id");


    $folder="../../../src/img/uploaded/";
    if (!empty($image) && file_exists($folder . $image)) {
        unlink($folder . $image);
    }

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
