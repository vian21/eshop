<?php

include '../../config.php';
include '../../functions.php';


/**
 * Query products
 */
$query_products = $connect->query("SELECT * FROM products ORDER BY id DESC");

//array to contain products
$products = array();

while ($row = mysqli_fetch_assoc($query_products)) {
    $product = array();
    $product['id'] = $row['id'];
    $product['name'] = $row['name'];
    $product['description'] = $row['description'];
    $product['image'] = $row['image'];
    $product['price'] = $row['price'];
    $product['quantity'] = $row['quantity'];
    $product['category'] = $row['category'];

    $products[] = $product;
}

echoJson($products);
