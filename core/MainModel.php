<?php

namespace core;

class MainModel implements MainInterface
{
    public function connect()
    {
        return DataBase::getInstance();
    }
}
