
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Radar, Shield, AlertCircle, Play, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScanButtonProps {
  className?: string;
  onScanComplete?: (results: any) => void;
  autoScan?: boolean;
  interval?: number; // in minutes
}

const ScanButton: React.FC<ScanButtonProps> = ({
  className,
  onScanComplete,
  autoScan = false,
  interval = 60, // default to 60 minutes
}) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoScanEnabled, setAutoScanEnabled] = useState(autoScan);
  const { toast } = useToast();

  // Add automatic scanning on component mount if autoScan is enabled
  useEffect(() => {
    if (autoScanEnabled) {
      toast({
        title: "Auto-scanning enabled",
        description: `Security scans will run automatically every ${interval} minutes`,
        duration: 5000,
      });
      
      // Run initial scan
      handleScan();
      
      // Set up interval for automatic scanning
      const intervalId = setInterval(() => {
        if (!scanning) {
          handleScan();
        }
      }, interval * 60 * 1000); // Convert minutes to milliseconds
      
      return () => clearInterval(intervalId);
    }
  }, [autoScanEnabled, interval]);

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setProgress(0);
    
    toast({
      title: "Scan started",
      description: "Scanning for vulnerabilities...",
      duration: 3000,
    });
    
    // Simulate scan progress
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 600);
    
    // Simulate scan completion
    setTimeout(() => {
      clearInterval(intervalId);
      setProgress(100);
      setScanning(false);
      
      const mockResults = {
        timestamp: new Date().toISOString(),
        totalVulnerabilities: 12,
        severities: {
          critical: 2,
          high: 3,
          medium: 4,
          low: 2,
          info: 1,
        },
        scanDuration: '1m 24s',
        targetIp: '192.168.1.1',
        targetHostname: 'example.com',
      };
      
      if (onScanComplete) {
        onScanComplete(mockResults);
      }
      
      toast({
        title: "Scan completed",
        description: `Found ${mockResults.totalVulnerabilities} vulnerabilities`,
        duration: 5000,
      });
      
      // Automatically send an email alert to admin
      const criticalCount = mockResults.severities.critical;
      const highCount = mockResults.severities.high;
      
      if (criticalCount > 0 || highCount > 0) {
        toast({
          title: "Automatic Alert Sent",
          description: `Security alert with ${criticalCount} critical and ${highCount} high vulnerabilities was automatically sent to the administrator`,
          duration: 5000,
        });
      }
    }, 8000);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Button
        onClick={handleScan}
        disabled={scanning}
        size="lg"
        className={cn(
          "relative overflow-hidden group transition-all duration-300 font-medium min-w-40",
          scanning ? "bg-primary/90" : "bg-primary hover:bg-primary/90"
        )}
      >
        <span className="flex items-center gap-2">
          {scanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Radar className="h-4 w-4" />
              {autoScanEnabled ? "Auto-Scanning Enabled" : "Start Security Scan"}
            </>
          )}
        </span>
        
        {scanning && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-severity-info"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
          />
        )}
      </Button>
      
      {scanning && (
        <p className="mt-2 text-xs text-muted-foreground">
          {progress < 30 ? (
            "Initializing scan..."
          ) : progress < 60 ? (
            "Analyzing application structure..."
          ) : progress < 90 ? (
            "Identifying vulnerabilities..."
          ) : (
            "Finalizing results..."
          )}
        </p>
      )}
      
      {!scanning && autoScanEnabled && (
        <p className="mt-2 text-xs text-muted-foreground">
          Auto-scan will run every {interval} minutes
        </p>
      )}
    </div>
  );
};

export default ScanButton;
