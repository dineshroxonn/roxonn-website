import { ReactNode } from 'react';

interface CustomButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export function CustomButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`glass-panel px-6 py-3 inline-flex items-center hover-glow ${className}`}
    >
      {children}
    </button>
  );
}
