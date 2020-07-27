<?php

namespace models;

use core\MainInterface;
use PDO;
use Throwable;

class Book
{
    private $db;

    public function __construct(MainInterface $main)
    {
        $this->db = $main->connect();
    }

    public function insert(array $data)
    {
        try {
            $sql = "INSERT INTO book(first_name, last_name, phone, email, photo) VALUES(:first_name, :last_name, :phone, :email, :photo)";
            $stmt = $this->db->prepare($sql);
            $stmt = $this->prepareData($stmt, $data);
            $stmt->execute();
            return true;
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
            return false;
        }
    }

    public function view()
    {
        $sth = $this->db->prepare("SELECT * FROM book");
        $sth->execute();
        return $sth->fetchAll();
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
