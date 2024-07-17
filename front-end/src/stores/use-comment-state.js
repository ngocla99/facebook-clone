import { create } from "zustand"

export const useCommentState = create((set) => ({
  text: "",
  isLoading: false,
  isError: false,
  mutate: (text) => set({ text, isLoading: true, isError: false }),
  onSuccess: () => set({ text: "", isLoading: false, isError: false }),
  onError: () => set({ isLoading: false, isError: true }),
}))
