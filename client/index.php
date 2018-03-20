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

    $possibleMoves = [];

    for ($row = 0; $row < count($board); $row++) {
        for ($col = 0; $col < count($board[$row]); $col++) {
            if(!$board[$row][$col]) {
                $possibleMoves[] = [ $row, $col ];
            }
        }
    }

    $moveIndex = mt_rand(0, count($possibleMoves));

    return new \Symfony\Component\HttpFoundation\JsonResponse($possibleMoves[$moveIndex]);
});

$app->options('{_}', function () {
    return new \Symfony\Component\HttpFoundation\JsonResponse(null, 204);
})->assert('_', '.*');


$app->run();
