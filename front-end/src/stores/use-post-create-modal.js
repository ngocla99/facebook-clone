import { create } from "zustand"

export const usePostCreateModal = create((set) => ({
  openBy: null,
  isOpen: false,
  onOpen: ({ openBy }) => set({ openBy, isOpen: true }),
  onClose: () => set({ openBy: null, isOpen: false }),
}))
