<?php

use \PHPUnit\Framework\TestCase;
use \ServiceApp\AI;

class AITest extends TestCase
{
    private $AI;

    public function __construct()
    {
        parent::__construct();
        $this->AI = new AI;
    }

    public function testGetMove(): void
    {
        $boardA = [
            [ null, 'O', 'O' ],
            [ 'X', null, 'O' ],
            [ 'X', 'X', null ],
        ];
        $boardAMoves = [ [0,0], [1,1], [2,2] ];

        $boardB = [
            [ 'X', null, 'O' ],
            [ 'O', null, 'X' ],
            [ 'X', null, 'O' ],
        ];
        $boardBMoves = [ [0,1], [1,1], [2,1] ];

        $boardC = [
            [ 'X', 'X', null ],
            [ 'X', null, 'O' ],
            [ null, 'O', 'O' ],
        ];
        $boardCMoves = [ [0,2], [1,1], [2,0] ];

        $this->assertContains($this->AI->getOptimalMove($boardA, 'X'), $boardAMoves);
        $this->assertContains($this->AI->getOptimalMove($boardB, 'O'), $boardBMoves);
        $this->assertContains($this->AI->getOptimalMove($boardC, 'X'), $boardCMoves);
    }

    public function testNoAvailableMoves(): void
    {
        $board = [
            [ true, true, true ],
            [ true, true, true ],
            [ true, true, true ],
        ];

        $this->assertEmpty($this->AI->getOptimalMove($board, 'X'));
    }


    public function testEmptyBoardMove(): void
    {
        $boardA = $this->getBoardBySize();
        $boardB = $this->getBoardBySize(5);
        $boardC = $this->getBoardBySize(7);

        $this->assertEquals($this->AI->getOptimalMove($boardA, 'X'), [1,1]);
        $this->assertEquals($this->AI->getOptimalMove($boardB, 'X'), [2,2]);
        $this->assertEquals($this->AI->getOptimalMove($boardC, 'X'), [3,3]);
    }

    public function testGetFlattenBoard(): void
    {
        $board = [
            [ 'X', null, null ],
            [ 'O', 'O', 'X' ],
            [ null, null, 'X' ],
        ];

        $method = new ReflectionMethod('ServiceApp\AI', 'getFlattenBoard');
        $method->setAccessible(true);

        $actual = $method->invokeArgs($this->AI, [$board]);
        $expected = [ 'X', 1, 2, 'O', 'O', 'X', 6, 7, 'X' ];

        $this->assertEquals($expected, $actual);
    }

    public function testGetTwoDimensionalPosition(): void
    {
        $method = new ReflectionMethod('ServiceApp\AI', 'getTwoDimensionalPosition');
        $method->setAccessible(true);

        $this->assertEquals([2, 1], $method->invokeArgs($this->AI, [3, 7]));
        $this->assertEquals([1, 0], $method->invokeArgs($this->AI, [3, 3]));
        $this->assertEquals([2, 2], $method->invokeArgs($this->AI, [3, 8]));

        $this->assertEquals([1, 3], $method->invokeArgs($this->AI, [5, 8]));
        $this->assertEquals([2, 1], $method->invokeArgs($this->AI, [5, 11]));
    }


    public function testGetAvailableMovesFromFlatten(): void
    {
        $method = new ReflectionMethod('ServiceApp\AI', 'getAvailableMovesFromFlatten');
        $method->setAccessible(true);

        $flattenBoard = ['X','X','X',3,4,'X','X',7,8];
        $expected = [3,4,7,8];
        $actual = $method->invokeArgs($this->AI, [ $flattenBoard ]);

        $this->assertEquals($expected, $actual);
    }


    public function testGetFlattenWinCombinations(): void
    {
        $method = new ReflectionMethod('ServiceApp\AI', 'getFlattenWinCombinations');
        $method->setAccessible(true);

        $expected = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[6,4,2]
        ];

        $actual = $method->invokeArgs($this->AI, [3]);

        $this->assertEquals($expected, $actual);
    }

    /**
     * @param int $size
     * @return array
     */
    private function getBoardBySize(int $size = 3): array
    {
        $output = [];

        for ($i = 0; $i < $size; $i ++) {
            $output[] = [];
            for ($j = 0; $j < $size; $j ++) {
                $output[$i][$j] = false;
            }
        }

        return $output;
    }
}