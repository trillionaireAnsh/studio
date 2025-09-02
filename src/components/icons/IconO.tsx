import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const IconO: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-12 h-12 text-chart-2 animate-fade-in', className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
};
