<?php
session_start();

// if ($_SESSION['type'] == 0 && $_POST['id']) {
if ($_POST['id']) {

    include '../../config.php';
    include '../../functions.php';

    $id = sanitize($_POST['id']);

    //get tranasction info
    $transaction = fetchTransactionInfo($id);

    $product_id = $transaction['product_id'];
    $quantity = $transaction['quantity'];


    //delete order
    $delete = $connect->query("DELETE FROM transactions WHERE id=$id");

    //update quantity
    $update = $connect->query("UPDATE products set quantity=quantity+$quantity WHERE id=$product_id");


    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
