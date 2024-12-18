import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function CustomButton({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        'font-medium transition-all duration-200',
        variant === 'default' &&
          'bg-gradient-to-r from-[#00C2FF] to-[#7000FF] hover:from-[#00C2FF]/90 hover:to-[#7000FF]/90',
        variant === 'secondary' &&
          'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100',
        className
      )}
      variant={variant}
      size={size}
      {...props}
    />
  );
}
