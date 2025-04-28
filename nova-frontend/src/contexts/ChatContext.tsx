import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`nova_messages_${user.id}`);
      if (stored) setMessages(JSON.parse(stored));
    } else {
      setMessages([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`nova_messages_${user.id}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  const sendMessage = async (content: string): Promise<void> => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();
      const botResponse = data.reply || "Oops, NOVA ghosted you 😬";

      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content: botResponse,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      const errorMessage: Message = {
        id: `msg-${Date.now() + 2}`,
        content: "NOVA is offline, probably being dramatic. Try again later 💅",
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (user) localStorage.removeItem(`nova_messages_${user.id}`);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
