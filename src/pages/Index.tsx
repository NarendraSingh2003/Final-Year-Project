
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Lock, AlertTriangle, Shield } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-effect sticky top-0 z-50 w-full py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-medium text-xl tracking-tight">VulnAware</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Advanced Vulnerability Detection Platform
            </h1>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Detect security vulnerabilities with precision and elegance. 
              Our advanced scanning technology helps protect your applications from threats.
            </p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" onClick={() => navigate('/dashboard')}>
                <span className="flex items-center gap-2">
                  Get Started 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/scan-results')}>
                View Demo Results
              </Button>
            </div>
          </FadeIn>
        </section>

        <section className="mb-20">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Comprehensive Security Analysis
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 mb-4" />,
                title: "Automated Scanning",
                description: "Our intelligent scanning engine automatically detects vulnerabilities across your entire application stack."
              },
              {
                icon: <AlertTriangle className="h-10 w-10 mb-4" />,
                title: "Vulnerability Assessment",
                description: "Detailed analysis of each vulnerability with severity ratings and remediation guidance."
              },
              {
                icon: <Lock className="h-10 w-10 mb-4" />,
                title: "Security Monitoring",
                description: "Continuous monitoring to detect new vulnerabilities as they emerge in your application."
              }
            ].map((feature, index) => (
              <FadeIn key={index} delay={100 * (index + 1)}>
                <div className="glass-panel p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-glass-hover">
                  {feature.icon}
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="glass-panel p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to secure your application?</h2>
              <p className="text-muted-foreground mb-6">
                Start with our comprehensive security scan and discover vulnerabilities before attackers do.
              </p>
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Launch Dashboard
              </Button>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VulnAware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
