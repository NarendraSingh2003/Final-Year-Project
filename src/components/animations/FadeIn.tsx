
import React from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0,
  duration = 500,
  direction = 'up',
  className
}) => {
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};
  const durationStyle = { animationDuration: `${duration}ms` };
  
  let translationClass = '';
  switch (direction) {
    case 'up':
      translationClass = 'translate-y-4';
      break;
    case 'down':
      translationClass = '-translate-y-4';
      break;
    case 'left':
      translationClass = 'translate-x-4';
      break;
    case 'right':
      translationClass = '-translate-x-4';
      break;
    default:
      translationClass = '';
  }
  
  return (
    <div 
      className={cn(
        "opacity-0 animate-fade-in",
        direction !== 'none' && translationClass,
        className
      )}
      style={{ ...delayStyle, ...durationStyle }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
