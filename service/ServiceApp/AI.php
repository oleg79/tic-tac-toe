<?php

namespace ServiceApp;

class AI
{
    /**
     * @soap
     * @param array $board
     * @return array
     */
    public function getMove(array $board):array
    {
        $possibleMoves = [];

        for ($row = 0; $row < count($board); $row++) {
            for ($col = 0; $col < count($board[$row]); $col++) {
                if(!$board[$row][$col]) {
                    $possibleMoves[] = [ $row, $col ];
                }
            }
        }

        $cnt = count($possibleMoves);

        if ($cnt === 0) {
            return [];
        } elseif ($cnt === count($board) ** 2) {
            $index = floor(count($board) / 2);

            return [ $index, $index ];
        }

        return $cnt === 1 ? $possibleMoves[0] : $possibleMoves[ mt_rand(0, $cnt - 1) ];
    }
}
