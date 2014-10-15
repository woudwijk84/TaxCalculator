<?php

require_once("Calculator/Autoloader.php");

use Calculator as Calculator;

header('Content-type: application/json');

$machine = new Calculator/Machine();

//TODO implement actionhandler for button
if(isset($_GET['inkomen']) && isset($_GET['studiekosten'])
    && isset($_GET['giften']) && isset($_GET['ziektekosten'])
    && isset($_GET['koopwoning'])){
    echo json_encode($machine->getTax($_GET['inkomen'],$_GET['studiekosten'],
        $_GET['giften'],$_GET['ziektekosten'],$_GET['koopwoning']));
}