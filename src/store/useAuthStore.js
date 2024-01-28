import { create } from "zustand"


export const useAuthStore = create((set) => {
  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser= currentUserJson
    ? JSON.parse(currentUserJson)
    : {};

  const storedAccessToken = currentUser?.accessToken;

  const isSubscriptionConfigured = currentUser?.isSubscriptionConfigured

  return {
    accessToken: storedAccessToken,
    isLoggedIn: Boolean(storedAccessToken),
    isSubscriptionConfigured,
    login: () => {
      set((prev) => ({ ...prev, isLoggedIn: true }));
    },
    logout: () => {
      set((prev) => ({ ...prev, isLoggedIn: false }));
    },
    setIsCofigured: (isSubscriptionConfigured) => set({ isSubscriptionConfigured }),
  };
});

