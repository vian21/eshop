<?php

include '../../config.php';
include '../../functions.php';

$query_categories = $connect->query("SELECT * FROM categories ORDER BY id DESC");

$categories = array();
while ($row = mysqli_fetch_assoc($query_categories)) {
    $category = array();
    $category['id'] = $row['id'];
    $category['name'] = $row['name'];

    $categories[] = $category;
}


echoJson($categories);
