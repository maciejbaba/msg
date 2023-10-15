import { create } from "zustand";

interface ChatState {
  messages: string[];
  add: (by: string) => void;
}

const useChatState = create<ChatState>((set) => ({
  messages: [],
  add: (by) => set((state) => ({ messages: [...state.messages, by] })),
}));

export default useChatState;