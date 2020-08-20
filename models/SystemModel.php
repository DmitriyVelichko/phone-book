<?php

namespace modls;

use core\MainModel;
use PDO;
use Exception;

class SystemModel
{
    private $db;

    public function __construct()
    {
        $this->db = (new MainModel())->connect();
    }

    public function getValueByKey($key)
    {
        $sql = "SELECT `value` FROM system WHERE `key`=:key";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":key", $key, PDO::PARAM_STR);
        $stmt->execute();
        $value = $stmt->fetch(PDO::FETCH_COLUMN);
        return $value;
    }
}
