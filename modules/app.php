<?php

include 'config.php';
include 'functions.php';

header("content-type: text/javascript");

?>
<?php echo minify(file_get_contents("../src/js/variables.js")); ?>

<?php echo compressCodeIn("../src/js/user/retrieve/") ?>
<?php echo compressCodeIn("../src/js/user/create/") ?>
<?php echo compressCodeIn("../src/js/admin/retrieve/") ?>
<?php echo compressCodeIn("../src/js/admin/create/") ?>
<?php echo compressCodeIn("../src/js/admin/update/") ?>
<?php echo compressCodeIn("../src/js/admin/update/product/") ?>
<?php echo compressCodeIn("../src/js/admin/delete/") ?>


<?php echo minify(file_get_contents("../src/js/functions.js")); ?>
<?php echo minify(file_get_contents("../src/js/admin/main.js")); ?>

<?php echo minify(file_get_contents("../src/js/admin/main.js")); ?>
<?php echo minify(file_get_contents("../src/js/user/main.js")); ?>
<?php echo minify(file_get_contents("../src/js/admin/functions.js")); ?>

