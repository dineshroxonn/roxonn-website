import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          'px-8 py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-lg',
          {
            'bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#E11D48] hover:opacity-90 text-white shadow-lg':
              variant === 'primary',
            'bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20':
              variant === 'secondary',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export { CustomButton };
