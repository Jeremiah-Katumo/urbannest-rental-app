import { create } from "zustand";
import { ChatMessage, Conversation, User } from "../types";
import { MOCK_CONVERSATIONS } from "../constants";

type ChatStore = {
    conversations: Conversation[];
    activeConversationId: string | null;
    activeChat: User | null;

    setActiveConversationId: (id: string | null) => void;
    setActiveChat: (user: User | null) => void;

    sendMessage: (conversationId: string, message: ChatMessage) => void;
    createConversation: (conversation: Conversation) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    conversations: MOCK_CONVERSATIONS,
    activeConversationId: null,
    activeChat: null,

    setActiveConversationId: (id) => set({ activeConversationId: id }),
    setActiveChat: (user) => set({ activeChat: user }),

    sendMessage: (conversationId, message) =>
        set((state) => ({
            conversations: state.conversations.map((c) =>
                c.id === conversationId
                    ? { ...c, messages: [...c.messages, message] }
                    : c
            ),
        })),

    createConversation: (conversation) =>
        set((state) => ({
            conversations: [conversation, ...state.conversations],
        })),
}));