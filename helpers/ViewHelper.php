<?php

namespace helps;

class ViewHelper
{
    public static function render($file_path, $data)
    {
        extract($data);
        ob_start();
        require $_SERVER['DOCUMENT_ROOT']."/views/$file_path.php";
        return ob_get_clean();
    }
}