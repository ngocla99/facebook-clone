import { create } from "zustand"

export const useProfileUser = create((set) => ({
  user: null,
  mutate: ({ user }) => set({ user }),
}))
