<?php

namespace ctrls;

use modls\SystemModel;
use modls\UsersModel;
use helps\ViewHelper;

class UsersController
{
    public $model;
    public $recaptchaSiteKey;
    public $recaptchaSecretKey;

    public function __construct(UsersModel $users)
    {
        $this->model = $users;
        $this->recaptchaSiteKey = (new SystemModel)->getValueByKey('recaptcha_site_key');
        $this->recaptchaSecretKey = (new SystemModel)->getValueByKey('recaptcha_secret_key');
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
        $data['recaptchaSiteKey'] = $this->recaptchaSiteKey;
        $data['recaptchaSecretKey'] = $this->recaptchaSecretKey;

        if (!$this->validate($data)) {
            $this->view('document', ['error' => 'Ошибка ввода данных!']);
        }
        if (empty($_POST['g-recaptcha-response'])) {
            $this->view('document', ['error' => 'Вы не прошли проверку на Recaptcha!']);
        }

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
        $data['recaptchaSiteKey'] = $this->recaptchaSiteKey;
        $data['recaptchaSecretKey'] = $this->recaptchaSecretKey;

        if (empty($_POST['g-recaptcha-response'])) {
            $this->view('document', ['error' => 'Вы не прошли проверку на Recaptcha!']);
        }
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
