
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { mockUsers, mockFriendRequests, currentUserId } from '../../data/mockData';
import { User, FriendRequest } from '../../types';

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  addFriendContainer: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  friendItem: {
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
  friendInfo: {
    flex: 1,
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
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  chatButton: {
    backgroundColor: theme.colors.primary,
  },
  acceptButton: {
    backgroundColor: theme.colors.primary,
  },
  declineButton: {
    backgroundColor: theme.colors.error || '#FF6B6B',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default function FriendsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  const friends = mockUsers.filter(user => user.id !== currentUserId);
  const incomingRequests = mockFriendRequests.filter(req => 
    req.toUserId === currentUserId && req.status === 'pending'
  );
  const sentRequests = mockFriendRequests.filter(req => 
    req.fromUserId === currentUserId && req.status === 'pending'
  );

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

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting friend request:', requestId);
    Alert.alert('Success', 'Friend request accepted!');
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining friend request:', requestId);
    Alert.alert('Request declined');
  };

  const handleStartChat = (friendId: string) => {
    console.log('Starting chat with friend:', friendId);
    Alert.alert('Chat', 'Opening chat...');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a Friend</Text>
          <View style={styles.addFriendContainer}>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Friends ({friends.length})</Text>
          {friends.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateText}>
                No friends yet. Add some friends to get started!
              </Text>
            </View>
          ) : (
            friends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(friend.name)}</Text>
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendEmail}>{friend.email}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.actionButton, styles.chatButton]}
                  onPress={() => handleStartChat(friend.id)}
                >
                  <Text style={styles.actionButtonText}>Chat</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incoming Requests ({incomingRequests.length})</Text>
          {incomingRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="mail-outline" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateText}>No pending friend requests</Text>
            </View>
          ) : (
            incomingRequests.map((request) => {
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
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={() => handleAcceptRequest(request.id)}
                  >
                    <Text style={styles.actionButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.declineButton]}
                    onPress={() => handleDeclineRequest(request.id)}
                  >
                    <Text style={styles.actionButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sent Requests ({sentRequests.length})</Text>
          {sentRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="paper-plane-outline" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateText}>No sent requests</Text>
            </View>
          ) : (
            sentRequests.map((request) => {
              const recipient = mockUsers.find(user => user.id === request.toUserId);
              return (
                <View key={request.id} style={styles.friendItem}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(recipient?.name || 'U')}</Text>
                  </View>
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{recipient?.name}</Text>
                    <Text style={styles.friendEmail}>{recipient?.email}</Text>
                  </View>
                  <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>
                    Pending
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
