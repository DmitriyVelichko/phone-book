<?php

namespace ctrls;

use modls\UsersModel;
use helps\ViewHelper;

class UsersController
{
    public $model;

    public function __construct(UsersModel $users)
    {
        $this->model = $users;
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

    public function register($data)
    {
        $data['register'] = true;
        $token = md5('phone-book' . $_POST['login'] . $_POST['pass']);
        $user = $this->model->findByLoginAndPass($_POST['login'], $token);

        if (empty($user)) {
            if (!empty($_POST['login']) && !empty($_POST['pass'])) {
                $this->insert([
                    'login' => $data['login'],
                    'pass' => $token,
                ]);
                $_SESSION['login'] = $data['login'];
                unset($data['register']);
                $data['book'] = true;
                $this->view('document', $data);
            } else {
                $this->view('document', $data);
            }
        } else {
            $this->view('document', ['error' => 'Такой пользователь существует!']);
        }
    }

    public function auth($data)
    {
        $data['auth'] = true;
        $token = md5('phone-book' . $_POST['login'] . $_POST['pass']);
        $user = $this->model->findByLoginAndPass($data['login'], $token);

        if (empty($user)) {
            $this->view('document', $data);
        } else {
            $_SESSION['login'] = $data['login'];
            $data['book'] = true;
            $this->view('document', $data);
        }
    }

    public function view($template, $args)
    {
        if ($_POST['ajax']) {
            echo json_encode($args); die;
        }
        echo ViewHelper::render($template, $args);
    }

    public function AuthReg($data)
    {
        if ($_REQUEST['auth']) {
            $this->auth($data);
        }
        $this->register($data);
    }
}
