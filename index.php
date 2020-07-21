<?php

session_start();

if (isset($_SESSION['id'])) {
    if ($_SESSION['type'] == 0) {
        include "views/admin/index.php";
    }

    if ($_SESSION['type'] == 1) {
        include "views/user/index.php";
    }
}
