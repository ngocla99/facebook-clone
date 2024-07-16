import { create } from "zustand"

export const usePostModal = create((set) => ({
  postId: null,
  isOpen: false,
  onOpen: (postId) => set({ isOpen: true, postId: postId }),
  onClose: () => set({ isOpen: false, postId: null }),
}))
