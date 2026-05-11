import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuestListState {
  guestList: string;
}

interface WritingState {
  isWriting: boolean;
  currentWritingName: string;
}

interface JoinGroupState {
  isOpen: boolean;
}

interface ChatImageState {
  isOpen: boolean;
}

interface GuestListActions {
  setGuestList: (guestList: string) => void;
}

interface WritingActions {
  setIsWriting: (isWriting: boolean) => void;
  setCurrentWritingName: (currentWritingName: string) => void;
}

interface JoinGroupActions {
  setIsOpen: (isOpen: boolean) => void;
}

interface ChatImageActions {
  setIsOpen: (isOpen: boolean) => void;
}

type JoinGroupStore = JoinGroupState & JoinGroupActions;
type ChatImageStore = ChatImageState & ChatImageActions;
type WritingStore = WritingState & WritingActions;
type GuestListStore = GuestListState & GuestListActions;

export const useGuestListStore = create<GuestListStore>()(
  persist(
    (set) => ({
      guestList: "",
      setGuestList: (guestList) => set({ guestList }),
    }),
    { name: "guest-list" }
  )
);

export const useWritingStore = create<WritingStore>()((set) => ({
  isWriting: false,
  currentWritingName: "",
  setIsWriting: (isWriting) => set({ isWriting }),
  setCurrentWritingName: (currentWritingName) => set({ currentWritingName }),
}));

export const useJoinGroupStore = create<JoinGroupStore>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    { name: "join-group" }
  )
);

export const useChatImageStore = create<ChatImageStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
