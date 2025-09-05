import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const AppLogo: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-fade-in', className)}
      {...props}
    >
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      <circle cx="6" cy="6" r="1.5" fill="hsl(var(--chart-1))" stroke="none" />
      <path d="M17 17l2 2m0-2l-2 2" stroke="hsl(var(--chart-2))" strokeWidth="2.5" />
    </svg>
  );
};
