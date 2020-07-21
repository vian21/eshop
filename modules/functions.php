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
        echo " ";
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
