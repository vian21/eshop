<?php

include '../../config.php';
include '../../functions.php';

/**
 * General array to contain array of products per category
 * This products will be arranged as categories were arranged for javascript array positions to match
 */
$categorical_products = array();

//fetch all categories
$query_categories = $connect->query("SELECT * FROM categories ORDER BY id DESC");

while ($row = mysqli_fetch_assoc($query_categories)) {
    $products = array();

    //current category id
    $category = $row['id'];

    //fetch products in that category
    $query_products = $connect->query("SELECT * FROM products WHERE category=$category AND quantity!=0 ORDER BY id DESC");

    while ($column = mysqli_fetch_assoc($query_products)) {
        $product = array();
        $product['id'] = $column['id'];
        $product['name'] = $column['name'];
        $product['description'] = $column['description'];
        $product['image'] = $column['image'];
        $product['price'] = $column['price'];
        $product['quantity'] = $column['quantity'];
        $product['category'] = $column['category'];

        $products[] = $product;
    }

    $categorical_products[] = $products;
}

echoJson($categorical_products);
