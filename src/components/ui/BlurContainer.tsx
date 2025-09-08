
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const BlurContainer: React.FC<BlurContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "glass-panel p-6 transition-all duration-300 hover:shadow-glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
