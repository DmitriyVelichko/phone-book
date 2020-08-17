<?php

namespace modls;

use core\MainModel;
use PDO;
use Exception;

class BookModel
{
    private $db;

    public function __construct()
    {
        $this->db = (new MainModel())->connect();
    }

    public function findById($id)
    {
        $sth = $this->db->prepare("SELECT * FROM `book` WHERE `id` = ?");
        $sth->execute(array($id));
        $value = $sth->fetch(PDO::FETCH_ASSOC);
        return $value;
    }
    public function insert($userId, $data)
    {
        try {
            $sql = "INSERT INTO book(first_name, last_name, phone, email, photo, user_id) VALUES(:first_name, :last_name, :phone, :email, :photo, :user_id)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return $this->findById($this->db->lastInsertId());
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
            return false;
        }
    }

    public function update($id, $userId, $data)
    {
        try {
            $sql = "UPDATE book SET first_name=:first_name, last_name=:last_name, phone=:phone, email=:email, photo=:photo WHERE id=:id AND user_id=:user_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return $this->findById($id);
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
            return false;
        }
    }

    public function delete($id, $userId)
    {
        try {
            $sql = "DELETE FROM book WHERE id=:id AND user_id=:user_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
            $stmt->execute();
            return $id;
        } catch (Exception $e) {
            echo 'Code: ' . $e->getCode() . '| Message: ' . $e->getMessage();
            return false;
        }
    }

    public function findAll($userId)
    {
        $sql = "SELECT * FROM book WHERE user_id=:user_id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
        $stmt->execute();
        $value = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $value;
    }

    public function prepareData($stmt, $data)
    {
        $stmt->bindParam(":first_name", $data['first_name'], PDO::PARAM_STR);
        $stmt->bindParam(":last_name", $data['last_name'], PDO::PARAM_STR);
        $stmt->bindParam(":phone", $data['phone'], PDO::PARAM_STR);
        $stmt->bindParam(":email", $data['email'], PDO::PARAM_STR);
        $stmt->bindParam(":photo", $data['photo'], PDO::PARAM_STR);
        return $stmt;
    }
}
