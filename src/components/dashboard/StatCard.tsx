
import React from 'react';
import { cn } from '@/lib/utils';
import BlurContainer from '../ui/BlurContainer';
import { cva } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

const statCardVariants = cva(
  "flex flex-col h-full",
  {
    variants: {
      variant: {
        default: "",
        critical: "text-severity-critical",
        high: "text-severity-high",
        medium: "text-severity-medium",
        low: "text-severity-low",
        info: "text-severity-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "critical" | "high" | "medium" | "low" | "info";
  className?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  variant = "default",
  className,
  trend,
}) => {
  return (
    <BlurContainer className={cn("h-full", className)}>
      <div className={cn(statCardVariants({ variant }))}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-5 w-5 opacity-80" />
        </div>
        
        <div className="mt-1 flex items-baseline">
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          
          {trend && (
            <span 
              className={cn(
                "ml-2 text-xs font-medium", 
                trend.direction === 'up' ? 'text-severity-critical' : 'text-severity-low'
              )}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </BlurContainer>
  );
};

export default StatCard;
