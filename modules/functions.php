<?php

/**
 *  Sanitize a given input for msql attacks and strip html and php tags
 */
function sanitize($input)
{
    include 'config.php';

    return mysqli_real_escape_string($connect, htmlentities($input));
}

/**
 * Compress and minify javascript or CSS code in a folder
 */
function compressCodeIn($folder)
{
    $files = array_diff(scandir($folder), array('..', '.', 'index.php'));

    $code = "";

    foreach ($files as $file) {
        $sub_code = file_get_contents($folder . $file);
        $code .= "\n" . $sub_code;
    }
    return minify($code);
}

/**
 * Minify code input
 */
function minify($code)
{

    $code = preg_replace("/\s*\n\s*/", "\n", $code);
    return $code;
}

/**
 * echo json encoded string of an array
 */
function echoJson($data)
{
    if (!empty($data)) {
        echo json_encode($data);
    } else {
        echo "";
    }
}


/**
 * Fetch user profile picture
 */
function fetchImage($id)
{
    include 'config.php';

    $query = mysqli_fetch_assoc($connect->query("SELECT image FROM users WHERE id=$id LIMIT 1"));

    if (empty($query['image'])) {
        return "../user.png";
    } else {
        return $query['image'];
    }
}

/**
 * Fetch user profile picture
 */
function fetchUserInfo($id)
{
    include "config.php";

    $query = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id LIMIT 1"));

    return $query;
}

function fetchProductInfo($id)
{
    include "config.php";

    $query = mysqli_fetch_assoc($connect->query("SELECT*FROM products WHERE id=$id LIMIT 1"));

    return $query;
}


/**
 * Function to upload image and delete old one if given
 */
function uploadImage($image, $old = '')
{

    $folder = "../src/img/uploaded/";
    $oldImage = sanitize($old);

    $oldImgLocation =  $folder . $oldImage;

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
}


function pronounce($input)
{
    $words = explode(' ',$input);

    $pronuciation='';
    foreach($words as $word){
        $pronuciation.=metaphone($word).' ';
    }

    return $pronuciation;
}
