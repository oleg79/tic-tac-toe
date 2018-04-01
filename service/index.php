<?php
ini_set("soap.wsdl_cache_enabled", "0");

require_once __DIR__.'/../vendor/autoload.php';


if (isset($_GET['wsdl'])) {
    $miniMax = new \ServiceApp\AI;
    $serviceURI = 'http://service/index.php';
    $wsdlGenerator = new PHP2WSDL\PHPClass2WSDL($miniMax, $serviceURI);
    $wsdlGenerator->generateWSDL(true);
    header("Content-Type: text/xml");
    echo $wsdlGenerator->dump();
    exit;
}

$server = new SoapServer(null, ['uri' => 'http://service/index.php']);
$server->setClass('ServiceApp\\AI');
$server->handle();
