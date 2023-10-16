import { create } from "zustand";

interface ChatState {
  messages: string[];
  addMessage: (by: string) => void;
  removeMessage: (by: string) => void;
}

const useChatState = create<ChatState>((set) => ({
  messages: [],
  addMessage: (by) => set((state) => ({ messages: [...state.messages, by] })),
  removeMessage: (by) =>
    set((state) => ({ messages: state.messages.filter((m) => m !== by) })),
}));

export default useChatState;
