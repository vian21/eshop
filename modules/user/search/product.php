<?php

if (isset($_POST['description'])) {

    include '../../config.php';
    include '../../functions.php';

    $description = sanitize($_POST['description']);

    $words = explode(' ', $description);

    //metaphone string to query with
    $query_string = "";

    foreach ($words as $word) {
        $query_string .= metaphone($word) . " ";
    }

    /*
     * Reverse string query
     * To allow seaching for item in whatever order
     */
    $reverse = array_reverse($words);
    $reverse_query = "";
    foreach ($reverse as $word) {
        $reverse_query .= metaphone($word) . " ";
    }

    /**
     * Query for searching
     */
    $query_products = $connect->query("SELECT * FROM products where indexing like '%$query_string%' OR indexing like '%$reverse_query%' ORDER BY id DESC");

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
}
