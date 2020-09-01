<?php

namespace core;

use helps\CatalogHelper;

class Route
{
    private $request;
    private $action;
    private $args;
    private $controller;
    private $model;

    public function __construct()
    {
        header('Content-Type: text/html; charset=utf-8');
        session_start();
        $this->request = parse_url($_SERVER['REQUEST_URI']);
        $this->action = trim($this->request['path'], '/');
        $this->args = !empty($_POST) ? $_POST : [];
    }

    public function start()
    {
        if ($this->action == 'logout') {
            $this->logout();
        }

        $this->setController();
        $this->setModel();
        $this->setAction();

        $controllerName = $this->getPathController();
        $modelName = $this->getPathModel();

        if ($this->validate()) {
            $controller = new $controllerName(new $modelName());
            $controller->{$this->action}($this->args);
        } else {
            Route::ErrorPage404();
        }
    }

    public function validate()
    {
        if (
            in_array(ucfirst($this->controller) . 'Controller.php', CatalogHelper::getFiles("controllers"))
            &&
            in_array(ucfirst($this->model) . 'Model.php', CatalogHelper::getFiles("models"))
        ) {
            return true;
        } else {
            return false;
        }
    }

    public function getPathController()
    {
        return '\\ctrls\\' . ucfirst($this->controller) . 'Controller';
    }

    public function getPathModel()
    {
        return '\\modls\\' . ucfirst($this->controller) . 'Model';
    }

    public function setController()
    {
        if (empty($_SESSION['login'])) {
            $this->controller = 'users';
        } else {
            $this->controller = 'book';
        }
    }

    public function setModel()
    {
        $this->model = $this->controller;
    }

    public function setAction()
    {
        if (empty($_SESSION['login'])) {
            if (empty($action)) {
                $this->action = 'AuthReg';
            }
        } else {
            if ($_POST['insContact']) {
                $this->action = 'insert';
            } elseif ($_POST['removeItem']) {
                $this->action = 'removeItem';
            } else {
                $this->action = 'findAll';
            }
        }
    }

    public function logout()
    {
        unset($_SESSION['login']);
        unset($_SESSION['token']);
        session_unset();
        header('Location: /auth/');
    }

    public function ErrorPage404()
    {
        $host = 'http://' . $_SERVER['HTTP_HOST'] . '/';
        header('HTTP/1.1 404 Not Found');
        header("Status: 404 Not Found");
        header('Location:' . $host . '404');
    }
}