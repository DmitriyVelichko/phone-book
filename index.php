<?php

ini_set('display_errors', 1);
require 'vendor/autoload.php';

use helps\CatalogHelper;

session_start();

$r = parse_url($_SERVER['REQUEST_URI']);

$action = trim($r['path'], '/');
$args = !empty($_POST) ? $_POST : [];

if ($action == 'logout') {
    unset($_SESSION['login']);
    unset($_SESSION['token']);
    session_unset();
    header('Location: /auth/');
}

if (empty($_SESSION['login'])) {
    $controller = 'users';
    if (empty($action)) {
        $action = 'AuthReg';
    }
} else {
    $controller = 'book';
    if($_POST['insContact']){
        $action = 'insert';
    }
    elseif ($_POST['removeItem']) {
        $action = 'removeItem';
    }
    else {
        $action = 'findAll';
    }
}

$controllers = CatalogHelper::getFiles("controllers");
$models = CatalogHelper::getFiles("models");

$file = ucfirst($controller);
$controller = $file . 'Controller';
$model = $file . 'Model';

$controllerName = '\\ctrls\\' . $controller;
$modelName = '\\modls\\' . $model;

header('Content-Type: text/html; charset=utf-8');
$controller = new $controllerName(new $modelName());
$controller->{$action}($args);
