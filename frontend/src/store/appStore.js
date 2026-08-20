import { create } from 'zustand'

export const useAppStore = create((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedSkillId: null,
  setSelectedSkillId: (id) => set({ selectedSkillId: id }),

  showNotifications: false,
  setShowNotifications: (show) => set({ showNotifications: show }),
  
  notificationCount: 3,
  setNotificationCount: (count) => set({ notificationCount: count })
}))
