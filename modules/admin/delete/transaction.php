<?php
session_start();
if ($_SESSION['type'] == 0 && $_POST['id']) {
    include '../../config.php';
    include '../../functions.php';

    $id=sanitize($_POST['id']);

    $delete=$connect->query("DELETE FROM transactions WHERE id=$id");

    if($delete){
        echo 'ok';
    }else{
        echo 'ko';
    }
}
