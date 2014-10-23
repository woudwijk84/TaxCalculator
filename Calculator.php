<?php

require_once("Calculator/Autoloader.php");
require_once('FirePHPCore/FirePHP.class.php');

ob_start();

use Calculator as Calculator;

header('Content-type: application/json');

$machine = new Calculator\Machine();

$firephp = FirePHP::getInstance(true);

$firephp->log('starting machine');

//TODO implement actionhandler for button
if(isset($_GET['inkomen']) && isset($_GET['studiekosten'])
    && isset($_GET['giften']) && isset($_GET['ziektekosten'])
    && isset($_GET['koopwoning']))
{
    echo json_encode($machine->getTax($_GET['inkomen'],$_GET['studiekosten'],
        $_GET['giften'],$_GET['ziektekosten'],$_GET['koopwoning']));
} else {
    header('HTTP/1.1 200 OK');
}