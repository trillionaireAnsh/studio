"use client";

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { IconX } from '@/components/icons/IconX';
import { IconO } from '@/components/icons/IconO';

type GameCellProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
};

export const GameCell: FC<GameCellProps> = ({ value, onClick, disabled, isWinningCell }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${value ? `is ${value}` : 'is empty'}`}
      className={cn(
        'flex h-24 w-24 items-center justify-center rounded-lg border-2 bg-card shadow-sm transition-all duration-200 hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        isWinningCell && 'bg-primary/20 scale-105 border-primary',
      )}
    >
      {value === 'X' && <IconX />}
      {value === 'O' && <IconO />}
    </button>
  );
};
