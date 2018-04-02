<?php

namespace ServiceApp;

class AI
{
    private const MINIMUM = -10000;
    private const MAXIMUM = 10000;

    private $player;
    private $AI;

    /**
     * @soap
     * @param array $board
     * @param string|null $AISymbol
     * @return array
     */
    public function getOptimalMove(array $board, string $AISymbol = null):array
    {
        $this->AI       = $AISymbol;
        $this->player   = $this->getPlayerSymbol($AISymbol);

        $possibleMoves = $this->getPossibleMoves($board);

        [
            'cellsNumber'   => $cellsNumber,
            'center'        => $center,
            'size'          => $size,
        ] = $this->getBoardInfo($board);

        $cnt = count($possibleMoves);

        if ($cnt === 0) {
            return [];
        } elseif ($cnt === $cellsNumber) {
            return $center;
        }


        [ 'index' => $flattenPosition ] = $this->minimax(
            $this->getFlattenBoard($board),
            $AISymbol
        );

        return $this->getTwoDimensionalPosition($size, $flattenPosition);
    }

    /**
     * @param array $board
     * @return array
     */
    private function getPossibleMoves(array $board): array
    {
        $possibleMoves = [];

        for ($row = 0; $row < count($board); $row++) {
            for ($col = 0; $col < count($board[$row]); $col++) {
                if(!$board[$row][$col]) {
                    $possibleMoves[] = [ $row, $col ];
                }
            }
        }

        return $possibleMoves;
    }

    /**
     * @param array $board
     * @return array
     */
    private function getBoardInfo(array $board): array
    {
        $size = count($board[0]);
        $cellsNumber = $size ** 2;
        $index = floor($size / 2);
        $center = [ $index, $index ];

        return compact('size', 'cellsNumber', 'center');
    }

    /**
     * @param array $board
     * @return array
     */
    private function getFlattenBoard(array $board): array
    {
        $flatten = [];
        $flattenIndex = 0;

        foreach ($board as $row) {
            foreach ($row as $cell) {
                $flatten[] = $cell ?? $flattenIndex;
                $flattenIndex++;
            }
        }

        return $flatten;
    }

    /**
     * @param int $size
     * @param int $position
     * @return array
     */
    private function getTwoDimensionalPosition(int $size, int $position): array
    {
        return [
            floor($position / $size),
            $position % $size
        ];
    }

    /**
     * @param string $AISymbol
     * @return string
     */
    private function getPlayerSymbol(string $AISymbol): string
    {
        return $AISymbol === 'X' ? 'O' : 'X';
    }

    /**
     * @param array $flattenBoard
     * @param string $player
     * @return array
     */
    private function minimax(array $flattenBoard, string $player): array
    {
        $availableMoves = $this->getAvailableMovesFromFlatten($flattenBoard);

        if ($this->checkWin($flattenBoard, $this->player)) {
            return [ 'score' => -10 ];
        } elseif ($this->checkWin($flattenBoard, $this->AI)) {
            return [ 'score' => 10 ];
        } elseif (empty($availableMoves)) {
            return [ 'score' => 0 ];
        }

        $moves = [];

        foreach ($availableMoves as $index => $position) {
            $move = [
                'index' => $flattenBoard[ $availableMoves[$index] ]
            ];
            $flattenBoard[ $availableMoves[$index] ] = $player;

            if ($player === $this->AI) {
                $result = $this->minimax($flattenBoard, $this->player);
                $move['score'] = $result['score'];
            } else {
                $result = $this->minimax($flattenBoard, $this->AI);
                $move['score'] = $result['score'];
            }

            $flattenBoard[ $availableMoves[$index] ] = $move['index'];

            $moves[] = $move;
        }

        $bestMove = 0;
        if ($player === $this->AI) {
            $bestScore = self::MINIMUM;
            foreach($moves as $index => [ 'score' => $score ]) {
                if ($score > $bestScore) {
                    $bestScore = $score;
                    $bestMove = $index;
                }
            }
        } else {
            $bestScore = self::MAXIMUM;
            foreach($moves as $index => [ 'score' => $score ]) {
                if ($score < $bestScore) {
                    $bestScore = $score;
                    $bestMove = $index;
                }
            }
        }

        return $moves[$bestMove];
    }

    /**
     * @param array $flattenBoard
     * @return array
     */
    private function getAvailableMovesFromFlatten(array $flattenBoard): array
    {
        return array_values(array_filter($flattenBoard, function($item) {
            return is_int($item);
        }));
    }

    /**
     * @param array $flattenBoard
     * @param string $symbol
     * @return bool
     */
    private function checkWin(array $flattenBoard, string $symbol): bool
    {
        $victory = false;
        $winCombinations = $this->getFlattenWinCombinations(3);
        $moves = array_keys(array_filter($flattenBoard, function ($move) use ($symbol) {
            return $move === $symbol;
        }));

        foreach ($winCombinations as $index => $comb) {
            if ($moves == $comb) return true;
        }

        return $victory;
    }

    /**
     * @param int $size
     * @return array
     */
    private function getFlattenWinCombinations(int $size): array
    {
        $flatten = range(0, $size ** 2 - 1);
        $horizontals = array_chunk($flatten, $size);

        $verticals = [];
        foreach($horizontals[0] as $index) {
            $verticals[] = array_map(function ($item) use ($size, $index) {
                return $item * $size + $index;
            }, $horizontals[0]);
        }

        $rightDiagonal = array_map(function ($item) use ($size) {
            return $item * $size + $item;
        }, $horizontals[0]);

        $leftDiagonal = array_map(function ($item, $index) use ($size) {
            return $item * $size + $index;
        }, array_reverse($horizontals[0]), $horizontals[0]);

        return array_merge(
            $horizontals,
            $verticals,
            [ $rightDiagonal, $leftDiagonal ]
        );
    }
}
