<?php

namespace ctrls;

use helps\ViewHelper;
use modls\BookModel;
use modls\UsersModel;

class BookController
{
    public $model;
    public $users;

    public function __construct(BookModel $book)
    {
        $this->model = $book;
        $this->users = new UsersModel();
    }

    public function insert($data)
    {
        if($data['insContact']){
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

        $this->model->insert([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['photo'],
            'email' => $data['email'],
            'photo' => $data['photo'],
        ]);
        $this->view('document', $data);
    }

    public function delete($data)
    {
        $this->model->delete($data);
    }

    public function update($id, $data)
    {
        $this->model->update($id, $data);
    }

    public function findAll()
    {
        $data['book'] = true;
        $content = $this->model->findAll();
        $data['content'] = $content;
        $user = $this->users->findByLogin($_SESSION['login']);
        $data['userName'] = $user['login'];
        $this->view('document', $data);
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
