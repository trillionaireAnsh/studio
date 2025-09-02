"use client";

import { useState } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateWinner } from '@/lib/game-logic';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const winnerInfo = calculateWinner(board);
  const isDraw = board.every(cell => cell !== null) && !winnerInfo;

  const handleCellClick = (index: number) => {
    if (winnerInfo || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let status;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-body">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-4xl font-bold text-primary">Noughts & Crosses</CardTitle>
          <CardDescription className="text-xl font-medium !mt-2">{status}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <GameBoard board={board} onCellClick={handleCellClick} winnerInfo={winnerInfo} />
          <Button onClick={handleReset} variant="default" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <RefreshCw className="mr-2 h-5 w-5" />
            New Game
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
