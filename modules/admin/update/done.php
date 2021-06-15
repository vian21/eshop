<?php

session_start();
if ($_SESSION['type'] == 0 && isset($_POST['id'])) {
    include '../../config.php';
    include '../../functions.php';

    $id = sanitize($_POST['id']);

    $update = $connect->query("UPDATE transactions SET status=1, delivered ='$date' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
