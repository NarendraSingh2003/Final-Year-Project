
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import VulnerabilityTable from '@/components/dashboard/VulnerabilityTable';
import AISecurityAdvisor from '@/components/dashboard/AISecurityAdvisor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vulnerability } from '@/components/dashboard/VulnerabilityCard';

// Mock data for vulnerabilities
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
];

const DashboardVulnerabilities: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <FadeIn delay={100} className="lg:col-span-2">
        <Tabs defaultValue="recent">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Vulnerabilities</h2>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent" className="m-0">
            <VulnerabilityTable 
              vulnerabilities={MOCK_VULNERABILITIES.sort((a, b) => 
                new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime()
              )} 
            />
          </TabsContent>
          
          <TabsContent value="critical" className="m-0">
            <VulnerabilityTable 
              vulnerabilities={MOCK_VULNERABILITIES.filter(v => v.severity === 'critical')} 
              title="Critical Vulnerabilities"
            />
          </TabsContent>
          
          <TabsContent value="all" className="m-0">
            <VulnerabilityTable 
              vulnerabilities={MOCK_VULNERABILITIES} 
              title="All Vulnerabilities"
            />
          </TabsContent>
        </Tabs>
      </FadeIn>

      <FadeIn delay={200}>
        <AISecurityAdvisor className="h-full" />
      </FadeIn>
    </div>
  );
};

export default DashboardVulnerabilities;
