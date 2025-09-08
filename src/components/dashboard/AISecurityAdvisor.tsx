
import React, { useState } from 'react';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Brain, Send, RefreshCw } from 'lucide-react';

interface AISecurityAdvisorProps {
  className?: string;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AI_SUGGESTIONS = [
  "How can I improve password policies?",
  "Best practices for API security?",
  "How to mitigate XSS attacks?",
  "Recommendations for CSRF protection?",
];

// Mock AI responses
const SECURITY_TIPS = {
  password: "Consider implementing a password policy requiring at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols. Enforce MFA for all admin accounts.",
  api: "Ensure all APIs use rate limiting, validate JWT tokens, implement proper CORS policies, and use HTTPS throughout. Consider using API keys with limited scopes.",
  xss: "Implement Content Security Policy (CSP) headers, sanitize all user inputs, use frameworks that automatically escape outputs, and consider using the HttpOnly flag for cookies.",
  csrf: "Implement anti-CSRF tokens in all forms, use SameSite cookies, check the HTTP Referer header, and consider using the 'Double Submit Cookie' pattern.",
  default: "I recommend implementing continuous security scanning across your infrastructure. Regular penetration testing combined with a robust vulnerability management program can significantly reduce your attack surface."
};

const AISecurityAdvisor: React.FC<AISecurityAdvisorProps> = ({ className }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: 'assistant', content: 'I can provide security guidance for your application. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = SECURITY_TIPS.default;
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('password')) response = SECURITY_TIPS.password;
      else if (lowerInput.includes('api')) response = SECURITY_TIPS.api;
      else if (lowerInput.includes('xss')) response = SECURITY_TIPS.xss;
      else if (lowerInput.includes('csrf')) response = SECURITY_TIPS.csrf;
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: 'I can provide security guidance for your application. How can I help you today?' }]);
    toast({
      title: "Conversation Reset",
      description: "Starting a new conversation with AI security advisor",
      duration: 3000,
    });
  };

  return (
    <BlurContainer className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-medium">AI Security Advisor</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset} title="Reset conversation">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-3 h-60 overflow-y-auto mb-4">
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`mb-3 ${message.role === 'assistant' ? 'pl-2 border-l-2 border-primary' : 'pl-2 border-l-2 border-muted-foreground'}`}
          >
            <div className="text-xs text-muted-foreground mb-1">
              {message.role === 'assistant' ? 'AI Security Advisor' : 'You'}
            </div>
            <div className={`text-sm ${message.role === 'assistant' ? 'text-foreground' : 'text-muted-foreground'}`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pl-2 border-l-2 border-primary">
            <div className="flex gap-1">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse animation-delay-200">.</span>
              <span className="animate-pulse animation-delay-400">.</span>
            </div>
            AI is thinking
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <div className="flex gap-2 mb-2 flex-wrap">
          {AI_SUGGESTIONS.map((suggestion, i) => (
            <Button 
              key={i}
              variant="outline" 
              size="sm" 
              className="text-xs py-1 h-auto"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          placeholder="Ask about security recommendations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-sm"
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </BlurContainer>
  );
};

export default AISecurityAdvisor;
