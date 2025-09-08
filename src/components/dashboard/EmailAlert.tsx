
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BlurContainer from '@/components/ui/BlurContainer';
import { Mail, Send, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EmailAlertProps {
  className?: string;
}

const EmailAlert: React.FC<EmailAlertProps> = ({ className }) => {
  const [email, setEmail] = useState<string>('admin@company.com');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [autoAlertEnabled, setAutoAlertEnabled] = useState(true);
  const { toast } = useToast();

  const handleSendAlert = () => {
    if (!alertMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter an alert message",
        duration: 3000,
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Alert Sent",
        description: `Security alert email sent to ${email}`,
        duration: 5000,
      });
      setAlertMessage('');
    }, 1500);
  };

  // Function that can be called externally to send automatic alerts
  const sendAutomaticAlert = (vulnerabilityData: any) => {
    if (!autoAlertEnabled) return;
    
    // In a real app, we would use the vulnerability data to create a detailed message
    const criticalCount = vulnerabilityData.severities?.critical || 0;
    const highCount = vulnerabilityData.severities?.high || 0;
    
    if (criticalCount > 0 || highCount > 0) {
      const autoMessage = `SECURITY ALERT: Scan completed at ${new Date().toLocaleString()} detected ${criticalCount} critical and ${highCount} high severity vulnerabilities that require immediate attention. Please check the security dashboard for details.`;
      
      // We would actually send the email here in a real application
      console.log(`Auto-sending alert to ${email}: ${autoMessage}`);
      
      // For demo purposes, we just show a toast
      toast({
        title: "Automatic Alert Sent",
        description: `Security alert email automatically sent to ${email}`,
        duration: 5000,
      });
    }
  };

  // Make this function available globally for other components to use
  // In a real app, we would use a context or a service for this
  (window as any).sendSecurityAlert = sendAutomaticAlert;

  return (
    <BlurContainer className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-medium">Email Alerts</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Auto-alerts: </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${autoAlertEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
              {autoAlertEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
          />
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Manual Alert
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Send Security Alert</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the alert message to send to the administrator. This will be sent to {email}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4">
              <Input
                className="w-full min-h-[100px]"
                placeholder="Describe the security issue or alert..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSendAlert}>Send Alert</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </BlurContainer>
  );
};

export default EmailAlert;
