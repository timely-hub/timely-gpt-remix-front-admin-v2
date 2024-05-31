import { v4 } from "uuid";
import { create, useStore } from "zustand";

export type ToastItemType = "success" | "error";

export type ToastItem = {
  id: string;
  message: string;
  type?: ToastItemType;
};

type ToastState = {
  messages: ToastItem[];
};
type ToastActions = {
  setToastMessage: (toastItem: ToastItem) => void;
  removeToastMessage: (uuid: string) => void;
};

const toastSlice = create<ToastState & ToastActions>((set) => ({
  messages: [],
  setToastMessage: (toastItem: ToastItem) =>
    set((state) => {
      return { messages: [...state.messages, toastItem] };
    }),
  removeToastMessage: (uuid: string) => {
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== uuid),
      };
    });
  },
}));

export const getToastInfoClient = () => {
  return toastSlice.getState().messages;
};

export const useToastStore = <T,>(selector?: (state: ToastState) => T): T =>
  useStore(toastSlice, selector!);

export const callToast = (message: string, type: ToastItemType = "error") => {
  const setToastMessage = toastSlice.getState().setToastMessage;
  const toastItem: ToastItem = {
    id: v4(),
    message,
    type,
  };
  setToastMessage(toastItem);
};

export default toastSlice;
