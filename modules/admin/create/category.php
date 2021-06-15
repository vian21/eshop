<?php
if (isset($_POST['name'])) {
    include '../../config.php';
    include '../../functions.php';

    $name = sanitize($_POST['name']);

    $insert = $connect->query("INSERT categories(name) VALUES('$name')");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
