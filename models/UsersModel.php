<?php

namespace modls;

use core\MainModel;
use PDO;
use Exception;

class UsersModel
{
    private $db;

    public function __construct()
    {
        $this->db = (new MainModel())->connect();
    }

    public function insert(array $data)
    {
        try {
            $sql = "INSERT INTO users(login, pass) VALUES(:login, :pass)";
            $stmt = $this->db->prepare($sql);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
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
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
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
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
            return false;
        }
    }

    public function findAll()
    {
        $sth = $this->db->prepare("SELECT * FROM users");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function findByLogin($login)
    {
        $sth = $this->db->prepare("SELECT * FROM `users` WHERE `login` = ?");
        $sth->execute(array($login));
        $value = $sth->fetch(PDO::FETCH_ASSOC);
        return $value;
    }

    public function findByLoginAndPass($login, $pass)
    {
        $sth = $this->db->prepare("SELECT * FROM `users` WHERE `login` = ? AND `pass` = ?");
        $sth->execute(array($login, $pass));
        $value = $sth->fetch(PDO::FETCH_ASSOC);
        return $value;
    }

    public function prepareData($stmt, $data)
    {
        if (!empty($data['login'])) {
            $stmt->bindParam(":login", $data['login'], PDO::PARAM_STR);
        }
        if (!empty($data['pass'])) {
            $stmt->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
        }
        return $stmt;
    }
}
