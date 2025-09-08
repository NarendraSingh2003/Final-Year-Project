
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShieldCheck, BarChart, Settings, Menu } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const links = [
    { name: 'Dashboard', path: '/', icon: <BarChart className="h-4 w-4 mr-2" /> },
    { name: 'Scan Results', path: '/scan-results', icon: <ShieldCheck className="h-4 w-4 mr-2" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-effect px-4 sm:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-medium text-xl tracking-tight hidden sm:block">VulnAware</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {link.icon}
                {link.name}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    location.pathname === link.path
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
