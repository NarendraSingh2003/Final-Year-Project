
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardVulnerabilities from '@/components/dashboard/DashboardVulnerabilities';
import SupportChatbot from '@/components/dashboard/SupportChatbot';

const Dashboard = () => {
  const [lastScanResults, setLastScanResults] = useState<any>(null);

  const handleScanComplete = (results: any) => {
    setLastScanResults(results);
    // In a real app, you would update the vulnerability data here
  };

  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts 
        lastScanResults={lastScanResults} 
        onScanComplete={handleScanComplete} 
      />
      <DashboardVulnerabilities />
      
      {/* The chatbot is a floating component, so we're adding it outside of the main grid */}
      <SupportChatbot />
    </DashboardLayout>
  );
};

export default Dashboard;
