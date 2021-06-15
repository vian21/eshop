<?php

if (isset($_POST['id']) && isset($_POST['quantity']) && is_numeric($_POST['quantity'])) {
    session_start();

    include '../../config.php';
    include '../../functions.php';

    $user = $_SESSION['id'];
    $product_id = sanitize($_POST['id']);
    $quantity = sanitize($_POST['quantity']);
    $shipping_address = sanitize($_POST['shipping_address']);

    $query_product = mysqli_fetch_assoc($connect->query("SELECT * FROM products WHERE id=$product_id LIMIT 1"));

    $name = $query_product['name'];
    $description = $query_product['description'];
    $price = (int) $query_product['price'];
    $category = $query_product['category'];
    $left = $query_product['quantity'];

    //calculate total
    $total = $price * $quantity;

    /**
     * Insert transaction
     */
    $insert = $connect->query("INSERT INTO transactions(date,user,product_id,product_name,description,price,quantity,shipping_address,category,total)
                             VALUES('$date',$user,$product_id,'$name','$description',$price,$quantity,'$shipping_address',$category,$total)");

    /**
     * update product quantity in stock
     */
    $remain=$left-$quantity;
    $update=$connect->query("UPDATE products set quantity=$remain WHERE id=$product_id");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
