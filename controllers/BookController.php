<?php

namespace ctrls;

use helps\ViewHelper;
use modls\BookModel;
use modls\UsersModel;

class BookController
{
    public $model;
    public $user;

    public function __construct(BookModel $book)
    {
        $this->model = $book;
        $this->user = !empty($_SESSION['login']) ? (new UsersModel())->findByLogin($_SESSION['login']) : null;

        foreach ($_POST as $key => $val) {
            $str = $val;
            $str = trim($str);
            $str = stripslashes($str);
            $str = htmlspecialchars($str);
            $_POST[$key] = $str;
        }
    }

    public function insert($data)
    {
        if ($data['insContact']) {
            $_POST['ajax'] = 1;
        }
        if (isset($_FILES['files']['name'][0])) {
            $size = $_FILES['files']['size'][0]; //Размер файла в байтах
            $maxSize = 2097152; //2Мб
            $type = $_FILES['files']['type'][0];
            $allowType = ['image/jpeg', 'image/png'];
            if ($size < $maxSize && in_array($type, $allowType)) {
                $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
                $inputName = $_FILES['files']['name'][0];
                if (!is_dir($path)) {
                    mkdir($path, 0777, true);
                }
                move_uploaded_file($_FILES['files']['tmp_name'][0], $path . $inputName);
                $data['photo'] = $inputName;
            }
        }

        $arr = [
            'first_name' => !empty($data['first_name']) ? $data['first_name'] : '',
            'last_name' => !empty($data['last_name']) ? $data['last_name'] : '',
            'phone' => !empty($data['phone']) ? $data['phone'] : '',
            'email' => !empty($data['email']) ? $data['email'] : '',
            'photo' => !empty($data['photo']) ? $data['photo'] : '',
        ];

        if (!empty($_POST['id'])) {
            $item = $this->model->update((int)$_POST['id'], (int)$this->user['id'], $arr);
        } else {
            $item = $this->model->insert((int)$this->user['id'], $arr);
        }

        $this->view('document', [
            'id' => $item['id'],
            'first_name' => $item['first_name'],
            'last_name' => $item['last_name'],
            'phone' => $item['phone'],
            'email' => $item['email'],
            'photo' => $item['photo'],
            'newContact' => (bool)$data['newContact']
        ]);
    }

    public function removeItem()
    {
        $id = $this->model->delete($_POST['id'], (int)$this->user['id']);
        $this->view('document', [
            'id' => $id,
        ]);
    }

    public function findAll()
    {
        $this->view('document', [
            'book' => true,
            'content' => $this->model->findAll((int)$this->user['id']),
            'userName' => $this->user['login']
        ]);
    }

    public function view($template, $args)
    {
        if ($_POST['ajax']) {
            echo json_encode($args);
            die;
        }
        echo ViewHelper::render($template, $args);
    }
}
