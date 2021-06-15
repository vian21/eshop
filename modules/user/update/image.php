<?php

session_start();
if (isset($_FILES['image'])) {

    include "../../config.php";
    include "../../functions.php";

    $id = $_SESSION['id'];
    $folder = "../../../src/img/uploaded/";
    $oldImage = sanitize($_POST['old']);

    $oldImgLocation =  $folder . $oldImage;

    $image=$_FILES['image'];
    $imgName = sanitize($image['name']);

    $location = $folder . $imgName;

    $imgType = pathinfo($location, PATHINFO_EXTENSION);
    $validExt = array('jpg', 'png', 'jpeg');
    //Check if sent files are images
    if (!in_array(strtolower($imgType), $validExt)) {
    } else {
        if (move_uploaded_file($image['tmp_name'], $location)) {
            //Delete the image if they don't have same name because by default it will replace the old one
            if (isset($oldImage) && !empty($oldImage) && $location !== $oldImgLocation) {

                if (!empty($oldImage) && file_exists($folder . $oldImage)) {
                    unlink($oldImgLocation);
                }
            }
        }
    }
    uploadImage($_FILES['image'], $oldImage);

    $imgName = $_FILES['image']['name'];
    //Change image location in database
    $change = $connect->query("UPDATE users SET image='$imgName' WHERE id=$id");
    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
