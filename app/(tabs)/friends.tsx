
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../../components/ThemeToggle';
import { mockUsers, mockFriendRequests, currentUserId } from '../../data/mockData';
import { User, FriendRequest } from '../../types';

export default function FriendsScreen() {
  const { theme } = useTheme();
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [friends] = useState<User[]>(mockUsers.filter(user => user.id !== currentUserId));
  const [incomingRequests] = useState<FriendRequest[]>(mockFriendRequests);
  const [sentRequests] = useState<FriendRequest[]>([]);

  const handleAddFriend = () => {
    console.log('Adding friend with email:', newFriendEmail);
    
    if (!newFriendEmail) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    if (!newFriendEmail.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Simulate sending friend request
    Alert.alert('Success', `Friend request sent to ${newFriendEmail}`);
    setNewFriendEmail('');
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting friend request:', requestId);
    Alert.alert('Success', 'Friend request accepted!');
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining friend request:', requestId);
    Alert.alert('Success', 'Friend request declined');
  };

  const handleStartChat = (friendId: string) => {
    console.log('Starting chat with friend:', friendId);
    Alert.alert('Info', 'Chat feature coming soon!');
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Friends</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Friend Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Add a Friend</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            Enter their email address to send a friend request
          </Text>
          
          <View style={styles.addFriendContainer}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.inputBackground,
                borderColor: theme.colors.border,
                color: theme.colors.text 
              }]}
              placeholder="friend@example.com"
              placeholderTextColor={theme.colors.textSecondary}
              value={newFriendEmail}
              onChangeText={setNewFriendEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleAddFriend}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Friends Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Friends ({friends.length})
          </Text>
          
          {friends.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No friends yet. Add some friends to get started!
            </Text>
          ) : (
            friends.map((friend) => (
              <View key={friend.id} style={[styles.friendItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.friendInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>
                      {friend.displayName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.friendDetails}>
                    <Text style={[styles.friendName, { color: theme.colors.text }]}>
                      {friend.displayName}
                    </Text>
                    <Text style={[styles.friendEmail, { color: theme.colors.textSecondary }]}>
                      {friend.email}
                    </Text>
                    <View style={styles.statusContainer}>
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: friend.isOnline ? theme.colors.success : theme.colors.textSecondary }
                      ]} />
                      <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
                        {friend.isOnline ? 'Online' : 'Offline'}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.chatButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => handleStartChat(friend.id)}
                >
                  <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Incoming Requests Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Incoming Requests ({incomingRequests.length})
          </Text>
          
          {incomingRequests.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No pending requests
            </Text>
          ) : (
            incomingRequests.map((request) => (
              <View key={request.id} style={[styles.requestItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.friendInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>
                      {request.fromUser.displayName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.friendDetails}>
                    <Text style={[styles.friendName, { color: theme.colors.text }]}>
                      {request.fromUser.displayName}
                    </Text>
                    <Text style={[styles.friendEmail, { color: theme.colors.textSecondary }]}>
                      {request.fromUser.email}
                    </Text>
                  </View>
                </View>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={[styles.acceptButton, { backgroundColor: theme.colors.success }]}
                    onPress={() => handleAcceptRequest(request.id)}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.declineButton, { backgroundColor: theme.colors.error }]}
                    onPress={() => handleDeclineRequest(request.id)}
                  >
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Sent Requests Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sent Requests ({sentRequests.length})
          </Text>
          
          {sentRequests.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No sent requests
            </Text>
          ) : (
            sentRequests.map((request) => (
              <View key={request.id} style={[styles.requestItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.friendInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>
                      {request.toUser.displayName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.friendDetails}>
                    <Text style={[styles.friendName, { color: theme.colors.text }]}>
                      {request.toUser.displayName}
                    </Text>
                    <Text style={[styles.friendEmail, { color: theme.colors.textSecondary }]}>
                      {request.toUser.email}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.pendingText, { color: theme.colors.textSecondary }]}>
                  Pending
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  addFriendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
  chatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
