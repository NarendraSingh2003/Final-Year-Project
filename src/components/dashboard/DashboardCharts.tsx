
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import VulnerabilityChart from '@/components/dashboard/VulnerabilityChart';
import BlurContainer from '@/components/ui/BlurContainer';
import EmailAlert from '@/components/dashboard/EmailAlert';
import ScanButton from '@/components/dashboard/ScanButton';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Clock, ArrowRight } from 'lucide-react';

// Mock data for charts
const CHART_DATA = [
  { date: 'Aug 1', critical: 0, high: 2, medium: 3, low: 4, info: 2 },
  { date: 'Aug 15', critical: 1, high: 2, medium: 5, low: 3, info: 3 },
  { date: 'Sep 1', critical: 2, high: 4, medium: 4, low: 2, info: 1 },
  { date: 'Sep 15', critical: 3, high: 3, medium: 6, low: 4, info: 2 },
  { date: 'Oct 1', critical: 2, high: 5, medium: 7, low: 3, info: 1 },
  { date: 'Oct 15', critical: 1, high: 3, medium: 5, low: 2, info: 0 },
];

interface DashboardChartsProps {
  lastScanResults: any;
  onScanComplete: (results: any) => void;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  lastScanResults,
  onScanComplete
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <FadeIn delay={100} className="lg:col-span-2">
        <VulnerabilityChart
          data={CHART_DATA}
          title="Vulnerability Trends"
          type="area"
        />
      </FadeIn>
      
      <FadeIn delay={200}>
        <div className="grid grid-cols-1 gap-6">
          <EmailAlert className="w-full" />
          
          <BlurContainer className="flex flex-col h-auto">
            <h3 className="text-base font-medium mb-6">Security Actions</h3>
            
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <ScanButton 
                  onScanComplete={onScanComplete} 
                  autoScan={true}
                  interval={30} // Run every 30 minutes
                />
                
                <div className="px-4 py-3 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-medium mb-1">Last Scan</h4>
                  {lastScanResults ? (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Completed: {new Date(lastScanResults.timestamp).toLocaleString()}</p>
                      <p>Duration: {lastScanResults.scanDuration}</p>
                      <p>Found: {lastScanResults.totalVulnerabilities} vulnerabilities</p>
                      {lastScanResults.targetHostname && (
                        <p>Target: {lastScanResults.targetHostname} ({lastScanResults.targetIp || 'Unknown IP'})</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No recent scans</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span className="flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    View Security Report
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Configure Auto-Scan Settings
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </BlurContainer>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardCharts;
