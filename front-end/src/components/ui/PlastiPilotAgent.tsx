import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, RefreshCw, Send, Bot, 
  TrendingUp, Settings, FileWarning, Link, Lightbulb, Play 
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { API_URL } from '../../config';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const PlastiPilotAgent: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          text: "Bonjour. Je suis **PlastiPilot**, l'assistant IA de **PlastiData**.\n\nJe suis là pour vous aider à piloter votre production plasturgie par la data — et vous montrer comment nos solutions peuvent transformer votre quotidien terrain.\n\nDites-moi ce que vous vivez en ce moment dans votre usine, et je vous oriente vers la bonne solution.",
          timestamp: getCurrentTime()
        }
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isAuthenticated) {
    return null;
  }

  function getCurrentTime(): string {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('[') && part.includes('](')) {
        const label = part.substring(1, part.indexOf(']'));
        const url = part.substring(part.indexOf('](') + 2, part.length - 1);
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-inline-link"
          >
            {label}
          </a>
        );
      }
      return part;
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    if (!textToSend) setInputValue('');

    const newMsg: Message = {
      role: 'user',
      text,
      timestamp: getCurrentTime()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/chat/`, {
        message: text,
        history: messages.map(m => ({ role: m.role, text: m.text }))
      });

      const replyText = response.data.reply || 'Je rencontre une difficulté temporaire.';
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: replyText,
          timestamp: getCurrentTime()
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "Je rencontre une difficulté de connexion. Vous pouvez me poser une autre question ou contacter directement Deborah via [linkedin.com/company/plastidata](https://linkedin.com/company/plastidata).",
          timestamp: getCurrentTime()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: "Bonjour. Je suis **PlastiPilot**, l'assistant IA de **PlastiData**.\n\nJe suis là pour vous aider à piloter votre production plasturgie par la data — et vous montrer comment nos solutions peuvent transformer votre quotidien terrain.\n\nDites-moi ce que vous vivez en ce moment dans votre usine, et je vous oriente vers la bonne solution.",
        timestamp: getCurrentTime()
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { label: 'PPM en hausse', text: 'Mon PPM augmente, que faire ?', icon: <TrendingUp size={13} className="text-red-500" /> },
    { label: 'TRS bas', text: 'Mon TRS est bas', icon: <Settings size={13} className="text-blue-500" /> },
    { label: 'Dashboard vide', text: 'Dashboard vide après actualisation', icon: <FileWarning size={13} className="text-yellow-500" /> },
    { label: 'Connexion', text: 'Comment connecter mes données ?', icon: <Link size={13} className="text-slate-500" /> },
    { label: 'Solutions', text: 'Quelles solutions proposez-vous ?', icon: <Lightbulb size={13} className="text-amber-500" /> },
    { label: 'Démarrer', text: 'Comment obtenir un dashboard ?', icon: <Play size={13} className="text-emerald-500" /> }
  ];

  return (
    <>
      <button
        type="button"
        className={`plastipilot-launcher ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir PlastiPilot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="launcher-tooltip">
            PlastiPilot
          </span>
        )}
      </button>

      <div className={`plastipilot-widget ${isOpen ? 'open' : ''}`}>
        <div className="pp-header">
          <div className="pp-header-left">
            <div className="pp-avatar-wrap">
              <div className="pp-avatar">
                <Bot size={22} className="text-white" />
              </div>
              <div className="pp-online"></div>
            </div>
            <div>
              <div className="pp-name">PlastiPilot</div>
              <div className="pp-role">
                <span className="pp-role-dot"></span>
                Assistant IA · PlastiData
              </div>
            </div>
          </div>
          <button
            type="button"
            className="pp-header-btn"
            onClick={handleResetChat}
            title="Réinitialiser"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <div className="pp-disclaimer">
          PlastiPilot vous oriente vers les solutions PlastiData adaptées à votre situation.
        </div>

        <div className="pp-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
              <div className="msg-header">
                {msg.role === 'assistant' ? 'PlastiPilot' : 'Vous'} · {msg.timestamp}
              </div>
              <div className="msg-bubble">
                <p className="whitespace-pre-wrap">{parseMarkdown(msg.text)}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="msg bot pp-typing">
              <div className="msg-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && !isTyping && (
          <div className="pp-quick">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="pp-q"
                onClick={() => handleSendMessage(q.text)}
              >
                {q.icon}
                <span>{q.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="pp-input-area">
          <textarea
            className="pp-input"
            placeholder="Posez votre question à PlastiPilot..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="pp-send"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={16} />
          </button>
        </div>

        <div className="pp-footer">
          Propulsé par <a href="https://linkedin.com/company/plastidata" target="_blank" rel="noopener noreferrer">PlastiData</a>
        </div>
      </div>
    </>
  );
};
