<?php
session_start();
if (isset($_SESSION['id'])&&isset($_POST['type'])) {
    include '../../config.php';
    include '../../functions.php';

    $id=$_SESSION['id'];
    $type = sanitize($_POST['type']);

    $query = $connect->query("SELECT*FROM transactions WHERE status=$type and user=$id ORDER BY id DESC");

    $transactions = array();
    while ($row = mysqli_fetch_assoc($query)) {
        $transaction = array();
        $transaction['id'] = $row['id'];
        $transaction['date'] = $row['date'];

        //user info
        $transaction['user_id'] = $row['user'];
        $user = fetchUserInfo($row['user']);
        $transaction['name'] = $user['name'];
        $transaction['image'] = $user['image'];
        $transaction['tel'] = $user['tel'];
        $transaction['email'] = $user['email'];
        $transaction['home_address'] = $user['home_address'];

        //product info
        $transaction['product_id'] = $row['product_id'];
        $product = fetchProductInfo($row['product_id']);
        $transaction['product_name'] = $row['product_name'];
        $transaction['product_image'] = $product['image'];
        $transaction['description'] = $row['description'];
        $transaction['price'] = $row['price'];
        $transaction['quantity'] = $row['quantity'];
        $transaction['shipping_address'] = $row['shipping_address'];
        $transaction['category'] = $row['category'];
        $transaction['reduction'] = $row['reduction'];
        $transaction['total'] = $row['total'];
        $transaction['status'] = $row['status'];

        $transactions[] = $transaction;
    }
    echoJson($transactions);
}
