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
        $this->model->insert($data);
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
            echo json_encode($args); die;
        }
        echo ViewHelper::render($template, $args);
    }
}
