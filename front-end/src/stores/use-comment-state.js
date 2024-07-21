import { create } from "zustand"

export const useCommentState = create((set) => ({
  isEdit: false,
  text: "",
  isLoading: false,
  isError: false,
  edit: (isEdit) => set({ isEdit }),
  mutate: ({ text }) => set({ text, isLoading: true, isError: false }),
  onSuccess: () => set({ text: "", isLoading: false, isError: false }),
  onError: () => set({ isLoading: false, isError: true }),
}))
