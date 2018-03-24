<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app['debug'] = true;

$app->after(function (Request $request, Response $response) {
    $response->headers->set('Access-Control-Allow-Origin', '*');
    $response->headers->set('Access-Control-Allow-Headers', '*');
});

$app->post('/get-move',function (\Symfony\Component\HttpFoundation\Request $request) {
    $board = json_decode($request->get('board'), true);

    $move = \ClientApp\DummyAI::getMove($board);

    try {
        $client = new SoapClient(null, ['uri' => 'http://service', 'location' => 'http://service']);
        $move = $client->getMove($board);
    } catch (Exception $e) {
        return \ClientApp\DummyAI::getMove($board);;
    }


    return new \Symfony\Component\HttpFoundation\JsonResponse($move);
});

$app->options('{_}', function () {
    return new \Symfony\Component\HttpFoundation\JsonResponse(null, 204);
})->assert('_', '.*');


$app->run();
