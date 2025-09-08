
import React from 'react';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} VulnAware. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
