import { create } from "zustand";
import { ChatMessage, Conversation, User } from "../types";
import { MOCK_CONVERSATIONS } from "../constants";

type ChatState = {
    conversations: Conversation[];

    activeConversationId: string | null;
    activeChat: User | null;

    setConversations: (
        fn: (prev: Conversation[]) => Conversation[]
    ) => void;

    setActiveConversationId: (id: string | null) => void;
    setActiveChat: (user: User | null) => void;

    sendMessage: (
        conversationId: string,
        message: ChatMessage
    ) => void;

    createConversation: (conversation: Conversation) => void;
};

export const useChatStore = create<ChatState>((set) => ({
    conversations: MOCK_CONVERSATIONS,

    activeConversationId: null,
    activeChat: null,

    // ✅ functional setter
    setConversations: (fn) =>
        set((state) => ({
            conversations: fn(state.conversations),
        })),

    setActiveConversationId: (id) =>
        set({ activeConversationId: id }),

    setActiveChat: (user) =>
        set({ activeChat: user }),

    // ✅ SEND MESSAGE
    sendMessage: (conversationId, message) =>
        set((state) => ({
            conversations: state.conversations.map((conv) =>
                conv.id === conversationId
                    ? {
                        ...conv,
                        messages: [...conv.messages, message],
                    }
                    : conv
            ),
        })),

    // ✅ CREATE CONVERSATION
    createConversation: (conversation) =>
        set((state) => ({
            conversations: [conversation, ...state.conversations],
        })),
}));