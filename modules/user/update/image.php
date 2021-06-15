<?php

session_start();
if (isset($_FILES['image'])) {

    include "../../config.php";
    include "../../functions.php";

    $id = $_SESSION['id'];
    $folder = "../../../src/img/uploaded/";
    $oldImage = sanitize($_POST['old']);

    $oldImgLocation =  $folder . $oldImage;

    $imgName = sanitize($_FILES['image']['name']);

    $image = uniqid('image_');

    $location = $folder . $image;

    $imgType = pathinfo($imgName, PATHINFO_EXTENSION);

    $validExt = array('jpg', 'png', 'jpeg');
    //Check if sent files are images
    if (!in_array(strtolower($imgType), $validExt)) {
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
    $change = $connect->query("UPDATE users SET image='$image' WHERE id=$id");
    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
