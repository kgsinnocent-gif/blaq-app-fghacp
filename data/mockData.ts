
import { User, FriendRequest, Status } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'kagiso@blaq.app',
    displayName: 'Kagiso',
    isOnline: true,
  },
  {
    id: '2',
    email: 'john@example.com',
    displayName: 'John Doe',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '3',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    isOnline: true,
  },
  {
    id: '4',
    email: 'mike@example.com',
    displayName: 'Mike Johnson',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];

export const mockFriendRequests: FriendRequest[] = [
  {
    id: '1',
    fromUser: mockUsers[1],
    toUser: mockUsers[0],
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '2',
    fromUser: mockUsers[3],
    toUser: mockUsers[0],
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
];

export const mockStatuses: Status[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    caption: 'Beautiful sunset today! 🌅',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 22), // 22 hours from now
    viewedBy: [],
  },
  {
    id: '2',
    userId: '3',
    user: mockUsers[2],
    imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=600&fit=crop',
    caption: 'Coffee time ☕',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20), // 20 hours from now
    viewedBy: ['1'],
  },
  {
    id: '3',
    userId: '2',
    user: mockUsers[1],
    imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=600&fit=crop',
    caption: 'Lunch break! 🍔',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18), // 18 hours from now
    viewedBy: [],
  },
];

export const currentUserId = '1';
