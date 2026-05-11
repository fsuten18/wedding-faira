export type Message = {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
  image?: string;
  linkMap?: string;
  writingDelay?: number;
};

export type GuestMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};
