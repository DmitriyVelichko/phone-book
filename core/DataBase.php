<?php

namespace core;

use PDO;

class DataBase
{
    private static $_instance = null;

    const DB_HOST = 'localhost';
    const DB_NAME = 'phone_book';
    const DB_USER = 'root';
    const DB_PASS = 'root';

    private function __construct () {}
    private function __clone () {}
    private function __wakeup () {}

    public static function getInstance()
    {
        if (self::$_instance != null) {
            return self::$_instance;
        }

        return new PDO(
            'mysql:host=' . self::DB_HOST . ';dbname=' . self::DB_NAME,
            self::DB_USER,
            self::DB_PASS,
            [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"]
        );
    }
}
