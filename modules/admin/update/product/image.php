<?php

session_start();

if (isset($_FILES['image'])) {

    include "../../../config.php";
    include "../../../functions.php";

    $id = $_POST['id'];

    $folder = "../../../../src/img/uploaded/";
    $oldImage = sanitize($_POST['old']);

    $oldImgLocation =  $folder . $oldImage;

    //get image uploaded name
    $imgName = $_FILES['image']['name'];

    //text to be inserted in database
    $image = uniqid('image_');

    $location = "../../../../src/img/uploaded/" . $image;

    //image extension
    $imgType = pathinfo($imgName, PATHINFO_EXTENSION);

    $validExt = array('jpg', 'png', 'jpeg');
    //Check if sent files are images
    if (!in_array(strtolower($imgType), $validExt)) {
        echo 'k';
    } else {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $location)) {
            //Delete the image if they don't have same name because by default it will replace the old one
            if (isset($oldImage) && !empty($oldImage) && $location !== $oldImgLocation) {

                if (!empty($oldImage) && file_exists($folder . $oldImage)) {
                    unlink($oldImgLocation);
                }
            }
        }
    }

    //Change image location in database
    $change = $connect->query("UPDATE products SET image='$image' WHERE id=$id");
    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
