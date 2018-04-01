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
            [ false, true, true ],
            [ true, false, true ],
            [ true, true, false ],
        ];
        $boardAMoves = [ [0,0], [1,1], [2,2] ];

        $boardB = [
            [ true, false, true ],
            [ true, false, true ],
            [ true, false, true ],
        ];
        $boardBMoves = [ [0,1], [1,1], [2,1] ];

        $boardC = [
            [ true, true, false ],
            [ true, false, true ],
            [ false, true, true ],
        ];
        $boardCMoves = [ [0,2], [1,1], [2,0] ];

        $this->assertContains($this->AI->getMove($boardA), $boardAMoves);
        $this->assertContains($this->AI->getMove($boardB), $boardBMoves);
        $this->assertContains($this->AI->getMove($boardC), $boardCMoves);
    }

    public function testNoAvailableMoves(): void
    {
        $board = [
            [ true, true, true ],
            [ true, true, true ],
            [ true, true, true ],
        ];

        $this->assertEmpty($this->AI->getMove($board));
    }


    public function testEmptyBoardMove(): void
    {
        $boardA = $this->getBoardBySize();
        $boardB = $this->getBoardBySize(5);
        $boardC = $this->getBoardBySize(7);

        $this->assertEquals($this->AI->getMove($boardA), [1,1]);
        $this->assertEquals($this->AI->getMove($boardB), [2,2]);
        $this->assertEquals($this->AI->getMove($boardC), [3,3]);
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