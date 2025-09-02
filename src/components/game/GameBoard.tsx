import type { FC } from 'react';
import { GameCell } from './GameCell';

type GameBoardProps = {
  board: ('X' | 'O' | null)[];
  onCellClick: (index: number) => void;
  winnerInfo: { winner: string; line: number[] } | null;
};

export const GameBoard: FC<GameBoardProps> = ({ board, onCellClick, winnerInfo }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-1 bg-border/20 rounded-lg">
      {board.map((value, index) => (
        <GameCell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          disabled={!!value || !!winnerInfo?.winner}
          isWinningCell={!!winnerInfo?.line.includes(index)}
        />
      ))}
    </div>
  );
};
