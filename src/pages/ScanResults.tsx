
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FadeIn from '@/components/animations/FadeIn';
import BlurContainer from '@/components/ui/BlurContainer';
import VulnerabilityCard from '@/components/dashboard/VulnerabilityCard';
import VulnerabilityTable from '@/components/dashboard/VulnerabilityTable';
import VulnerabilityChart from '@/components/dashboard/VulnerabilityChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Search, Filter } from 'lucide-react';
import { SeverityLevel, Vulnerability } from '@/components/dashboard/VulnerabilityCard';

// Mock data
const MOCK_VULNERABILITIES: Vulnerability[] = [
  {
    id: '1',
    title: 'SQL Injection in Login Form',
    description: 'The login form is vulnerable to SQL injection attacks, allowing attackers to bypass authentication.',
    severity: 'critical',
    status: 'open',
    discoveredAt: '2023-09-15T12:30:00Z',
    affectedUrls: ['https://example.com/login', 'https://example.com/admin/login'],
  },
  {
    id: '2',
    title: 'Cross-Site Scripting (XSS) in Comment Section',
    description: 'Persistent XSS vulnerability in the comment section allows attackers to inject malicious scripts.',
    severity: 'high',
    status: 'investigating',
    discoveredAt: '2023-09-18T09:45:00Z',
    affectedUrls: ['https://example.com/blog/post/1', 'https://example.com/blog'],
  },
  {
    id: '3',
    title: 'Insecure Direct Object Reference (IDOR)',
    description: 'API endpoints do not properly validate user access to resources, allowing unauthorized access.',
    severity: 'high',
    status: 'open',
    discoveredAt: '2023-09-20T15:12:00Z',
    affectedUrls: ['https://example.com/api/users'],
  },
  {
    id: '4',
    title: 'Missing Content Security Policy',
    description: 'The application does not implement Content Security Policy headers, increasing risk of XSS attacks.',
    severity: 'medium',
    status: 'open',
    discoveredAt: '2023-09-22T11:05:00Z',
  },
  {
    id: '5',
    title: 'Weak Password Policy',
    description: 'The current password policy allows simple passwords, making brute force attacks more likely to succeed.',
    severity: 'medium',
    status: 'fixed',
    discoveredAt: '2023-09-10T14:20:00Z',
  },
  {
    id: '6',
    title: 'Outdated jQuery Library (v1.8.3)',
    description: 'The application uses an outdated jQuery library with known security vulnerabilities.',
    severity: 'low',
    status: 'fixed',
    discoveredAt: '2023-09-05T08:15:00Z',
  },
  {
    id: '7',
    title: 'Cross-Site Request Forgery Vulnerability',
    description: 'Missing CSRF tokens in sensitive forms allows attackers to perform actions on behalf of authenticated users.',
    severity: 'high',
    status: 'open',
    discoveredAt: '2023-09-25T14:30:00Z',
  },
  {
    id: '8',
    title: 'Information Disclosure in Error Messages',
    description: 'Verbose error messages reveal sensitive system information that could aid attackers.',
    severity: 'medium',
    status: 'investigating',
    discoveredAt: '2023-09-28T10:15:00Z',
  },
  {
    id: '9',
    title: 'Session Fixation Vulnerability',
    description: 'The application does not invalidate existing session identifiers during authentication.',
    severity: 'critical',
    status: 'open',
    discoveredAt: '2023-10-01T09:20:00Z',
  },
  {
    id: '10',
    title: 'Insecure SSL/TLS Configuration',
    description: 'The server supports outdated TLS protocols and weak cipher suites.',
    severity: 'high',
    status: 'investigating',
    discoveredAt: '2023-10-05T16:45:00Z',
  },
];

const SEVERITY_DISTRIBUTION = [
  { name: 'Critical', value: 2, color: 'bg-severity-critical' },
  { name: 'High', value: 4, color: 'bg-severity-high' },
  { name: 'Medium', value: 6, color: 'bg-severity-medium' },
  { name: 'Low', value: 3, color: 'bg-severity-low' },
  { name: 'Info', value: 1, color: 'bg-severity-info' },
];

const ScanResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredVulnerabilities = MOCK_VULNERABILITIES.filter(vuln => 
    vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    vuln.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Scan Results</h1>
          <p className="text-muted-foreground">
            Detailed analysis of the latest security scan.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FadeIn delay={100}>
          <BlurContainer>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-medium">Latest Scan</h3>
                <p className="text-sm text-muted-foreground mt-1">October 10, 2023 at 14:32</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs gap-2">
                <Download className="h-3 w-3" />
                Export Report
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <h4 className="text-xs font-medium text-muted-foreground">Total Issues</h4>
                <p className="text-2xl font-semibold mt-1">16</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <h4 className="text-xs font-medium text-muted-foreground">Scan Duration</h4>
                <p className="text-2xl font-semibold mt-1">3m 42s</p>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mb-3">Severity Distribution</h4>
            <div className="space-y-3">
              {SEVERITY_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-24 text-xs">{item.name}</div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color}`} 
                      style={{ width: `${(item.value / 16) * 100}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-xs">{item.value}</div>
                </div>
              ))}
            </div>
          </BlurContainer>
        </FadeIn>
        
        <FadeIn delay={200}>
          <BlurContainer>
            <h3 className="text-base font-medium mb-4">Historical Scans</h3>
            
            <div className="space-y-4">
              {[
                { date: 'October 10, 2023', time: '14:32', issues: 16 },
                { date: 'October 3, 2023', time: '09:15', issues: 18 },
                { date: 'September 26, 2023', time: '11:48', issues: 21 },
                { date: 'September 19, 2023', time: '15:30', issues: 23 },
              ].map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm font-medium">{scan.date}</p>
                      <p className="text-xs text-muted-foreground">{scan.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline">{scan.issues} issues</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-4 text-muted-foreground text-xs">
              View All Scans
            </Button>
          </BlurContainer>
        </FadeIn>
      </div>
      
      <div className="mb-8">
        <FadeIn delay={300}>
          <VulnerabilityChart
            data={[
              { date: 'Week 1', critical: 3, high: 6, medium: 8, low: 4, info: 2 },
              { date: 'Week 2', critical: 2, high: 5, medium: 7, low: 5, info: 3 },
              { date: 'Week 3', critical: 2, high: 4, medium: 6, low: 3, info: 2 },
              { date: 'Week 4', critical: 2, high: 4, medium: 6, low: 3, info: 1 },
            ]}
            title="Issues Over Time"
            type="bar"
          />
        </FadeIn>
      </div>
      
      <div className="mb-8">
        <FadeIn delay={400}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Vulnerability Details</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vulnerabilities..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="table">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="table" className="m-0">
              <VulnerabilityTable 
                vulnerabilities={filteredVulnerabilities} 
                title={`${filteredVulnerabilities.length} Vulnerabilities Found`}
              />
            </TabsContent>
            
            <TabsContent value="cards" className="m-0">
              {filteredVulnerabilities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVulnerabilities.map((vuln) => (
                    <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                  ))}
                </div>
              ) : (
                <BlurContainer className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">No vulnerabilities found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </BlurContainer>
              )}
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default ScanResults;
