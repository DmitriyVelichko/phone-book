<?php

namespace core;

interface MainInterface
{
    public function connect();
}

class MainModel implements MainInterface
{
    protected $db;

    public function connect()
    {
        $this->db = DataBase::getInstance();
    }
}
