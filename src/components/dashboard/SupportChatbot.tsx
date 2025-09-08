
import React, { useState, useRef, useEffect } from 'react';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, X, Minimize, AlertCircle, ShieldCheck, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Knowledge base for common security questions
const KNOWLEDGE_BASE = {
  'scan': 'To start a security scan, click the "Start Security Scan" button in the Quick Actions panel. The scan will analyze your application for vulnerabilities.',
  'vulnerability': 'Vulnerabilities are weaknesses in your system that could be exploited by attackers. You can view them in the Vulnerabilities section of the dashboard.',
  'fix': 'To fix a vulnerability, click on it in the vulnerabilities table to see detailed information and recommended solutions.',
  'report': 'Security reports can be accessed by clicking the "View Security Report" button in the Quick Actions panel.',
  'critical': 'Critical vulnerabilities pose an immediate risk to your system and should be fixed immediately. They are highlighted in red in the vulnerabilities table.',
  'high': 'High severity vulnerabilities are serious issues that should be addressed quickly. They are highlighted in orange in the vulnerabilities table.',
  'login': 'Security credentials and login information are managed in the User Settings section. You can access it from the user menu in the top right corner.',
  'default': 'I\'m your security assistant. I can help you understand security vulnerabilities, how to fix them, and best practices for keeping your system secure. What would you like to know?'
};

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I\'m your security assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: generateResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for keyword matches
    if (lowerQuery.includes('scan') || lowerQuery.includes('scanning')) {
      return KNOWLEDGE_BASE.scan;
    } else if (lowerQuery.includes('vulnerability') || lowerQuery.includes('vulnerabilities')) {
      return KNOWLEDGE_BASE.vulnerability;
    } else if (lowerQuery.includes('fix') || lowerQuery.includes('resolve') || lowerQuery.includes('repair')) {
      return KNOWLEDGE_BASE.fix;
    } else if (lowerQuery.includes('report')) {
      return KNOWLEDGE_BASE.report;
    } else if (lowerQuery.includes('critical')) {
      return KNOWLEDGE_BASE.critical;
    } else if (lowerQuery.includes('high severity') || lowerQuery.includes('high risk')) {
      return KNOWLEDGE_BASE.high;
    } else if (lowerQuery.includes('login') || lowerQuery.includes('credentials') || lowerQuery.includes('password')) {
      return KNOWLEDGE_BASE.login;
    } else {
      return KNOWLEDGE_BASE.default;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating chat button */}
      <div 
        className={`fixed right-6 bottom-6 z-40 flex flex-col items-end gap-4 transition-all ${isOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
      >
        {isOpen && !isMinimized && (
          <BlurContainer className="w-80 h-96 flex flex-col shadow-xl border border-border/50 p-3">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-sm">Security Assistant</h3>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMinimize}>
                  <Minimize className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleChat}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex max-w-[85%] ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-l-lg rounded-br-lg' 
                        : 'bg-muted rounded-r-lg rounded-bl-lg'
                    } px-3 py-2`}
                  >
                    <div>
                      <div className="text-xs flex items-center gap-1 mb-1">
                        {message.role === 'bot' ? (
                          <>
                            <ShieldCheck className="h-3 w-3" />
                            <span>Assistant</span>
                          </>
                        ) : (
                          <>
                            <User className="h-3 w-3" />
                            <span>You</span>
                          </>
                        )}
                      </div>
                      <div className="text-sm">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex mb-3">
                  <div className="bg-muted rounded-r-lg rounded-bl-lg px-3 py-2">
                    <div className="text-xs flex items-center gap-1 mb-1">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Assistant</span>
                    </div>
                    <div className="flex gap-1 items-center h-5">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Ask a security question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-sm"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </BlurContainer>
        )}
        
        {isOpen && isMinimized && (
          <Button 
            className="flex items-center gap-2 shadow-lg"
            onClick={() => setIsMinimized(false)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Security Assistant</span>
          </Button>
        )}
        
        {!isOpen && (
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={toggleChat}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  );
};

export default SupportChatbot;
