<?php

include '../../config.php';
include '../../functions.php';

/**
 * Main array
 * contains 2 array
 * 0 : products array
 * 1 : categories
 */
$products_data = array();

/**
 * Query only for 30 new products in databes
 */
$query_products = $connect->query("SELECT * FROM products WHERE quantity!=0 ORDER BY id DESC LIMIT 30");

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

//append products to main array
$products_data[] = $products;

$query_categories = $connect->query("SELECT * FROM categories ORDER BY id DESC");

$categories = array();
while ($row = mysqli_fetch_assoc($query_categories)) {
    $category = array();
    $category['id'] = $row['id'];
    $category['name'] = $row['name'];

    $categories[] = $category;
}

$products_data[] = $categories;

echoJson($products_data);
