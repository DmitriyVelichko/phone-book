<?php

namespace models;

use core\MainInterface;
use PDO;
use Throwable;

class Users
{
    private $db;

    public function __construct(MainInterface $main)
    {
        $this->db = $main->connect();
    }

    public function insert(array $data)
    {
        try {
            $sql = "INSERT INTO users(login,pass) VALUES(:login, :pass)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":login", $data['login'], PDO::PARAM_STR);
            $stmt->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (Throwable $e) {
            return false;
        }
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM users WHERE id=:id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return true;
        } catch (Throwable $e) {
            return false;
        }
    }

    public function update($id, $data)
    {
        try {
            $sql = "UPDATE users SET pass=:pass WHERE id=:id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (Throwable $e) {
            return false;
        }
    }

    public function view()
    {
        $sth = $this->db->prepare("SELECT * FROM users");
        $sth->execute();
        return $sth->fetchAll();
    }
}
