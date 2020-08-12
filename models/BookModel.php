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
    public function insert(array $data)
    {
        try {
            $sql = "INSERT INTO book(first_name, last_name, phone, email, photo) VALUES(:first_name, :last_name, :phone, :email, :photo)";
            $stmt = $this->db->prepare($sql);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            echo 'Code: '.$e->getCode() . '| Message: '.$e->getMessage();
            return false;
        }
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM book WHERE id=:id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            echo 'Code: '.$e->getCode() . '| Message: '.$e->getMessage();
            return false;
        }
    }

    public function update($id, $data)
    {
        try {
            $sql = "UPDATE book SET first_name=:first_name, last_name=:last_name, phone=:phone, email=:email, photo=:photo WHERE id=:id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            echo 'Code: '.$e->getCode() . '| Message: '.$e->getMessage();
            return false;
        }
    }

    public function findAll()
    {
        $sth = $this->db->prepare("SELECT * FROM book");
        $sth->execute();
        $value = $sth->fetchAll(PDO::FETCH_ASSOC);
        return $value;
    }

    public function prepareData($stmt, $data)
    {
        if (!empty($data['first_name'])) {
            $stmt->bindParam(":first_name", $data['first_name'], PDO::PARAM_STR);
        }
        if (!empty($data['last_name'])) {
            $stmt->bindParam(":last_name", $data['last_name'], PDO::PARAM_STR);
        }
        if (!empty($data['phone'])) {
            $stmt->bindParam(":phone", $data['phone'], PDO::PARAM_STR);
        }
        if (!empty($data['email'])) {
            $stmt->bindParam(":email", $data['email'], PDO::PARAM_STR);
        }
        if (!empty($data['photo'])) {
            $stmt->bindParam(":photo", $data['photo'], PDO::PARAM_STR);
        }
        return $stmt;
    }
}
