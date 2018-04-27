<?php
define('SRC_PATH', dirname(__DIR__) . '/src/');

function __autoload($class_name) {
    require_once(  SRC_PATH.$class_name . '.php');
}

$obj  = new RestCllient();