<?php
/**
 * Created by PhpStorm.
 * User: ole
 * Date: 24.03.18
 * Time: 19:31
 */

namespace ClientApp;


class DummyAI
{
    /**
     * @param array $board
     * @return array
     */
    public static function getMove(array $board): array
    {
        $possibleMoves = [];

        for ($row = 0; $row < count($board); $row++) {
            for ($col = 0; $col < count($board[$row]); $col++) {
                if(!$board[$row][$col]) {
                    $possibleMoves[] = [ $row, $col ];
                }
            }
        }
        sleep(2); // thought process emulation
        $cnt = count($possibleMoves);
        return $cnt === 1 ? $possibleMoves[0] : $possibleMoves[ mt_rand(0, $cnt - 1) ];
    }
}