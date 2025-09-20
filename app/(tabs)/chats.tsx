
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { mockUsers, currentUserId, mockFriendRequests } from '../../data/mockData';
import { User, FriendRequest } from '../../types';

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
    padding: 8,
  },
  startChatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  lastSeen: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  friendEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  chatButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: theme.colors.border,
  },
  cancelButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function ChatsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showStartChatModal, setShowStartChatModal] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  
  const [chats] = useState([
    {
      id: '1',
      user: mockUsers.find(u => u.id === '2'),
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2:30 PM',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      user: mockUsers.find(u => u.id === '3'),
      lastMessage: 'Thanks for the help earlier!',
      timestamp: '1:15 PM',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      user: mockUsers.find(u => u.id === '4'),
      lastMessage: 'See you tomorrow 👋',
      timestamp: '11:45 AM',
      unreadCount: 1,
      isOnline: true,
    },
  ]);

  const friends = mockUsers.filter(user => user.id !== currentUserId);
  const incomingRequests = mockFriendRequests.filter(req => 
    req.toUserId === currentUserId && req.status === 'pending'
  );
  const sentRequests = mockFriendRequests.filter(req => 
    req.fromUserId === currentUserId && req.status === 'pending'
  );

  const formatLastSeen = () => {
    return 'Last seen recently';
  };

  const handleChatPress = (user: User) => {
    console.log('Opening chat with:', user.name);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddFriend = () => {
    if (!newFriendEmail.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    if (!newFriendEmail.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log('Adding friend:', newFriendEmail);
    Alert.alert('Success', `Friend request sent to ${newFriendEmail}`);
    setNewFriendEmail('');
  };

  const handleStartChatWithFriend = (friendId: string) => {
    console.log('Starting chat with friend:', friendId);
    setShowStartChatModal(false);
    Alert.alert('Chat', 'Opening chat...');
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting friend request:', requestId);
    Alert.alert('Success', 'Friend request accepted!');
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining friend request:', requestId);
    Alert.alert('Request declined');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowFriendsModal(true)}
          >
            <Ionicons name="person-add" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.startChatButton}
            onPress={() => setShowStartChatModal(true)}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {chats.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>
              No chats yet. Start a conversation with your friends!
            </Text>
          </View>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(chat.user!)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getInitials(chat.user?.name || 'U')}
                </Text>
                {chat.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{chat.user?.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                <Text style={styles.lastSeen}>{formatLastSeen()}</Text>
              </View>
              
              <View style={styles.chatMeta}>
                <Text style={styles.timestamp}>{chat.timestamp}</Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Friends Modal */}
      <Modal
        visible={showFriendsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFriendsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Friends</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Add New Friend</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={theme.colors.textSecondary}
                value={newFriendEmail}
                onChangeText={setNewFriendEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                <Text style={styles.addButtonText}>Send Friend Request</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Friends ({friends.length})</Text>
              <ScrollView style={{ maxHeight: 200 }}>
                {friends.map((friend) => (
                  <View key={friend.id} style={styles.friendItem}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{getInitials(friend.name)}</Text>
                    </View>
                    <View style={styles.friendInfo}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.friendEmail}>{friend.email}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.chatButton}
                      onPress={() => handleStartChatWithFriend(friend.id)}
                    >
                      <Text style={styles.chatButtonText}>Chat</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            {incomingRequests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Incoming Requests ({incomingRequests.length})</Text>
                <ScrollView style={{ maxHeight: 150 }}>
                  {incomingRequests.map((request) => {
                    const sender = mockUsers.find(user => user.id === request.fromUserId);
                    return (
                      <View key={request.id} style={styles.friendItem}>
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>{getInitials(sender?.name || 'U')}</Text>
                        </View>
                        <View style={styles.friendInfo}>
                          <Text style={styles.friendName}>{sender?.name}</Text>
                          <Text style={styles.friendEmail}>{sender?.email}</Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.chatButton, { backgroundColor: '#4CAF50', marginRight: 8 }]}
                          onPress={() => handleAcceptRequest(request.id)}
                        >
                          <Text style={styles.chatButtonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.chatButton, { backgroundColor: '#FF6B6B' }]}
                          onPress={() => handleDeclineRequest(request.id)}
                        >
                          <Text style={styles.chatButtonText}>Decline</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowFriendsModal(false)}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Start Chat Modal */}
      <Modal
        visible={showStartChatModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowStartChatModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Start New Chat</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select a Friend</Text>
              <ScrollView style={{ maxHeight: 300 }}>
                {friends.length === 0 ? (
                  <Text style={styles.emptyStateText}>
                    No friends available. Add some friends first!
                  </Text>
                ) : (
                  friends.map((friend) => (
                    <TouchableOpacity
                      key={friend.id}
                      style={styles.friendItem}
                      onPress={() => handleStartChatWithFriend(friend.id)}
                    >
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(friend.name)}</Text>
                      </View>
                      <View style={styles.friendInfo}>
                        <Text style={styles.friendName}>{friend.name}</Text>
                        <Text style={styles.friendEmail}>{friend.email}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowStartChatModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
