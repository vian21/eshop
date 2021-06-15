<?php

if (isset($_POST['name']) && isset($_POST['price']) && isset($_POST['quantity']) && isset($_POST['description'])) {
    include '../../config.php';
    include '../../functions.php';

    $name = sanitize($_POST['name']);
    $description = sanitize($_POST['description']);
    $price = sanitize($_POST['price']);
    $quantity = sanitize($_POST['quantity']);
    $category = sanitize($_POST['category']);

    //if image given upload
    if (isset($_FILES['image'])) {

        //get image uploaded
        $imgName = $_FILES['image']['name'];

        //image extension
        $imgType = pathinfo($imgName, PATHINFO_EXTENSION);

        //text to be inserted in database
        $image = uniqid('image_');

        $location = "../../../src/img/uploaded/" . $image;


        $validExt = array('png', 'jpg', 'jpeg');
        if (in_array(strtolower($imgType), $validExt)) {
            move_uploaded_file($_FILES['image']['tmp_name'], $location);
        }
    } else {
        $image = '';
    }

    //pronunciation
    $text = $name . ' ' . $description;
    $indexing = pronounce($text);

    $insert = $connect->query("INSERT INTO products(name,description,image,price,quantity,category,indexing) VALUES('$name','$description','$image',$price,$quantity,$category,'$indexing')");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
