
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import StatCard from '@/components/dashboard/StatCard';
import { AlertOctagon, AlertCircle, ShieldAlert, Shield } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <FadeIn delay={100}>
        <StatCard
          title="Critical Vulnerabilities"
          value="2"
          icon={AlertOctagon}
          variant="critical"
          description="2 new in the last 30 days"
          trend={{ value: 50, direction: 'up' }}
        />
      </FadeIn>
      
      <FadeIn delay={200}>
        <StatCard
          title="High Vulnerabilities"
          value="5"
          icon={AlertCircle}
          variant="high"
          description="1 new in the last 30 days"
        />
      </FadeIn>
      
      <FadeIn delay={300}>
        <StatCard
          title="Medium & Low"
          value="15"
          icon={ShieldAlert}
          variant="medium"
          description="3 fixed in the last 30 days"
          trend={{ value: 20, direction: 'down' }}
        />
      </FadeIn>
      
      <FadeIn delay={400}>
        <StatCard
          title="Security Score"
          value="76/100"
          icon={Shield}
          variant="info"
          description="Improved by 4 points"
          trend={{ value: 4, direction: 'up' }}
        />
      </FadeIn>
    </div>
  );
};

export default DashboardStats;
