import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User } from '../../types';
import { Send, User as UserIcon, X, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface ChatSystemProps {
  currentUser: User;
  onClose: () => void;
  targetUser?: User;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, onClose, targetUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('join', currentUser.id);

    newSocket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('message_sent', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !targetUser) return;

    const messageData = {
      senderId: currentUser.id,
      receiverId: targetUser.id,
      content: input,
    };

    socket.emit('send_message', messageData);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
            {targetUser?.avatar ? (
              <img src={targetUser.avatar} alt={targetUser.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm">{targetUser?.name || 'Support Chat'}</h3>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[500px] bg-slate-50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
            <MessageSquare className="w-12 h-12 opacity-20" />
            <p className="text-sm font-medium">Start a conversation with {targetUser?.name}</p>
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm font-medium shadow-sm",
                isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none"
              )}>
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {format(new Date(msg.timestamp), 'HH:mm')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatSystem;
