
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface FriendRequest {
  id: string;
  fromUser: User;
  toUser: User;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface Status {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption?: string;
  createdAt: Date;
  expiresAt: Date;
  viewedBy: string[];
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  createdAt: Date;
  readBy: string[];
}

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    error: string;
    warning: string;
    border: string;
    inputBackground: string;
  };
}
