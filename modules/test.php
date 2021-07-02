<?php
$folder = '../src/js/admin/retrieve/';

function compressCodeIn($folder)
{
    $files = array_diff(scandir($folder), array('.', '..', 'index.php'));

    $code = "";

    foreach ($files as $file) {
        if (is_file($folder . $file)) {
            $sub_code = file_get_contents($folder . $file);

            if ($sub_code) {
                $code .= "\n" . $sub_code;
            }
        } else {
        }
    }
    return $code;
}

echo CompressCodeIn($folder);
// var_dump(is_file($folder.'image.h'))