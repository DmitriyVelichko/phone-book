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

    public function validate($data)
    {
        $patternEmail = "/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/";
        $patternPass = "/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}/";
        if (preg_match($patternEmail, $data['login']) && preg_match($patternPass, $data['pass'])) {
            return true;
        }
        return false;
    }

    public function register($data)
    {
        if($this->validate($data)){
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
        } else {
            $this->view('document', ['error' => 'Ошибка ввода данных!']);
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
            echo json_encode($args);
            die;
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
