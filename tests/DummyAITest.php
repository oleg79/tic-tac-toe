<?php

use \PHPUnit\Framework\TestCase;
use \ClientApp\DummyAI;

/**
 * Class DummyAITest
 */
final class DummyAITest extends TestCase
{
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

        $this->assertContains(DummyAI::getMove($boardA), $boardAMoves);
        $this->assertContains(DummyAI::getMove($boardB), $boardBMoves);
        $this->assertContains(DummyAI::getMove($boardC), $boardCMoves);
    }

    public function testNoAvailableMoves(): void
    {
        $board = [
            [ true, true, true ],
            [ true, true, true ],
            [ true, true, true ],
        ];

        $this->assertEmpty(DummyAI::getMove($board));
    }


    public function testEmptyBoardMove(): void
    {
        $boardA = $this->getBoardBySize();
        $boardB = $this->getBoardBySize(5);
        $boardC = $this->getBoardBySize(7);

        $this->assertEquals(DummyAI::getMove($boardA), [1,1]);
        $this->assertEquals(DummyAI::getMove($boardB), [2,2]);
        $this->assertEquals(DummyAI::getMove($boardC), [3,3]);
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