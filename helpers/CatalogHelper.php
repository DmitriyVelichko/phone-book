<?php

namespace helps;

class CatalogHelper
{
    public static function getFiles($dir)
    {
        $filelist = [];
        if (is_dir($dir)) {
            if ($dh = opendir($dir)) {
                while (($file = readdir($dh)) !== false) {
                    if (pathinfo($file, PATHINFO_EXTENSION) == 'php') {
                        $filelist[] = $file;
                    }
                }
                closedir($dh);
            }
        }
        return $filelist;
    }
}