import React, { createContext, useContext, useState, useCallback } from "react";
import { ChatMessage, Conversation, User } from "../types";
import { MOCK_CONVERSATIONS } from "../constants";

type ChatContextType = {
    conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;

    activeConversationId: string | null;
    setActiveConversationId: React.Dispatch<React.SetStateAction<string | null>>;

    activeChat?: User | null;
    setActiveChat?: React.Dispatch<React.SetStateAction<User | null>>;

    sendMessage: (conversationId: string, message: ChatMessage) => void;
    createConversation: (conversation: Conversation) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [activeChat, setActiveChat] = useState<User | null>(null);

    const sendMessage = useCallback((conversationId: string, message: ChatMessage) => {
        setConversations(prev =>
            prev.map(conv =>
                conv.id === conversationId
                    ? { ...conv, messages: [...conv.messages, message] }
                    : conv
            )
        );
    }, []);

    const createConversation = useCallback((conversation: Conversation) => {
        setConversations(prev => [conversation, ...prev]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                setConversations,
                activeConversationId,
                setActiveConversationId,
                sendMessage,
                createConversation,
                activeChat, setActiveChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
    return ctx;
};