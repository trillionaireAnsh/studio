"use client";

import { useState, useEffect } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateWinner } from '@/lib/game-logic';
import { RefreshCw, PlayCircle } from 'lucide-react';
import { AppLogo } from '@/components/icons/AppLogo';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const winnerInfo = calculateWinner(board);
  const isDraw = board.every(cell => cell !== null) && !winnerInfo;
  const isGameOver = !!winnerInfo || isDraw;

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

  if (showSplash) {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <AppLogo className="h-24 w-24" />
          <h1 className="text-4xl font-bold text-primary">Noughts & Crosses</h1>
        </div>
        <div className="absolute bottom-10 text-center">
          <p className="text-sm text-muted-foreground">from</p>
          <p className="text-lg font-semibold tracking-wider text-foreground">YADAVAS</p>
        </div>
      </main>
    );
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
          {isGameOver ? (
            <Button onClick={handleReset} variant="default" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Ad for New Game
            </Button>
          ) : (
            <Button onClick={handleReset} variant="default" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <RefreshCw className="mr-2 h-5 w-5" />
              New Game
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
