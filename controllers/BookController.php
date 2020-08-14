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
    }

    public function insert($data)
    {
        if ($data['insContact']) {
            $_POST['ajax'] = 1;
        }
        if (isset($_FILES['files']['name'][0])) {
            $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';

            $inputName = $_FILES['files']['name'][0];

            if (!is_dir($path)) {
                mkdir($path, 0777, true);
            }
            move_uploaded_file($_FILES['files']['tmp_name'][0], $path . $inputName);

            $data['photo'] = $inputName;
        }

        if (!empty($_POST['id'])) {
            $arr = [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['photo'],
                'email' => $data['email'],
            ];
            if (!empty($data['photo'])) {
                $arr['photo'] = $data['photo'];
            }
            $this->model->update((int)$_POST['id'], (int)$this->user['id'], $arr);
        } else {
            $this->model->insert((int)$this->user['id'], [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'],
                'email' => $data['email'],
                'photo' => $data['photo'],
            ]);
        }

        $this->view('document', $data);
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
