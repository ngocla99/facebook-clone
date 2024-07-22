import { create } from "zustand"

export const usePostEditAudienceModal = create((set) => ({
  post: null,
  isOpen: false,
  onOpen: (post) => set({ post, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
