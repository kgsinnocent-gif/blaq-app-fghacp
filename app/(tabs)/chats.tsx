
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { User, FriendRequest } from '../../types';
import { mockUsers, currentUserId, mockFriendRequests } from '../../data/mockData';

export default function ChatsScreen() {
  const { theme } = useTheme();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showStartChat, setShowStartChat] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const styles = createStyles(theme);

  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const friends = mockUsers.filter(user => user.id !== currentUserId);

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleChatPress = (user: User) => {
    console.log('Opening chat with:', user.displayName);
    Alert.alert('Chat', `Opening chat with ${user.displayName}`);
  };

  const handleUserProfilePress = (user: User) => {
    console.log('Opening user profile:', user.displayName);
    Alert.alert('User Profile', `Viewing ${user.displayName}'s profile\n\nEmail: ${user.email}\nMessage: Hey there! I am using BlaqApp.`, [
      { text: 'Message', onPress: () => handleChatPress(user) },
      { text: 'Close', style: 'cancel' }
    ]);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddFriend = () => {
    if (!newFriendEmail.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    
    console.log('Adding friend:', newFriendEmail);
    Alert.alert('Success', `Friend request sent to ${newFriendEmail}`);
    setNewFriendEmail('');
    setShowAddFriend(false);
  };

  const handleStartChatWithFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      handleChatPress(friend);
    }
    setShowStartChat(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowAddFriend(true)}
          >
            <Ionicons name="person-add" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startChatButton}
            onPress={() => setShowStartChat(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Chats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Chats</Text>
          {friends.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(user)}
            >
              <TouchableOpacity 
                style={styles.avatar}
                onPress={() => handleUserProfilePress(user)}
              >
                <Text style={styles.avatarText}>{getInitials(user.displayName)}</Text>
                {user.isOnline && <View style={styles.onlineIndicator} />}
              </TouchableOpacity>
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <TouchableOpacity onPress={() => handleUserProfilePress(user)}>
                    <Text style={styles.chatName}>{user.displayName}</Text>
                  </TouchableOpacity>
                  <Text style={styles.chatTime}>
                    {user.isOnline ? 'Online' : user.lastSeen ? formatLastSeen(user.lastSeen) : 'Offline'}
                  </Text>
                </View>
                <Text style={styles.lastMessage}>Tap to start chatting</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Friend Modal */}
      <Modal
        visible={showAddFriend}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddFriend(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Friend</Text>
              <TouchableOpacity onPress={() => setShowAddFriend(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
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
              <Text style={styles.addButtonText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Start Chat Modal */}
      <Modal
        visible={showStartChat}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStartChat(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Start New Chat</Text>
              <TouchableOpacity onPress={() => setShowStartChat(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.friendsList}>
              {friends.map((friend) => (
                <TouchableOpacity
                  key={friend.id}
                  style={styles.friendItem}
                  onPress={() => handleStartChatWithFriend(friend.id)}
                >
                  <TouchableOpacity 
                    style={styles.avatar}
                    onPress={() => handleUserProfilePress(friend)}
                  >
                    <Text style={styles.avatarText}>{getInitials(friend.displayName)}</Text>
                    {friend.isOnline && <View style={styles.onlineIndicator} />}
                  </TouchableOpacity>
                  <View style={styles.friendInfo}>
                    <TouchableOpacity onPress={() => handleUserProfilePress(friend)}>
                      <Text style={styles.friendName}>{friend.displayName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.friendStatus}>
                      {friend.isOnline ? 'Online' : friend.lastSeen ? formatLastSeen(friend.lastSeen) : 'Offline'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  startChatButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  chatTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  friendsList: {
    maxHeight: 300,
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
  friendStatus: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
