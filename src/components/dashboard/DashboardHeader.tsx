
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage security vulnerabilities across your applications.
        </p>
      </FadeIn>
    </div>
  );
};

export default DashboardHeader;
