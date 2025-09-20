
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../../components/ThemeToggle';
import { mockUsers, currentUserId } from '../../data/mockData';
import { User } from '../../types';

export default function ChatsScreen() {
  const { theme } = useTheme();
  const [chats] = useState<User[]>(mockUsers.filter(user => user.id !== currentUserId));

  const formatLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return '';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleChatPress = (user: User) => {
    console.log('Opening chat with:', user.displayName);
    // In a real app, this would navigate to the chat screen
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Chats</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {chats.length === 0 ? (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles" size={64} color={theme.colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No Chats Yet</Text>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                Start a conversation with your friends from the Friends tab!
              </Text>
            </View>
          </View>
        ) : (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            {chats.map((user, index) => (
              <TouchableOpacity
                key={user.id}
                style={[
                  styles.chatItem,
                  { borderBottomColor: theme.colors.border },
                  index === chats.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => handleChatPress(user)}
              >
                <View style={styles.chatInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>
                      {user.displayName.charAt(0).toUpperCase()}
                    </Text>
                    {user.isOnline && (
                      <View style={[styles.onlineIndicator, { backgroundColor: theme.colors.success }]} />
                    )}
                  </View>
                  <View style={styles.chatDetails}>
                    <View style={styles.chatHeader}>
                      <Text style={[styles.chatName, { color: theme.colors.text }]}>
                        {user.displayName}
                      </Text>
                      <Text style={[styles.chatTime, { color: theme.colors.textSecondary }]}>
                        {user.isOnline ? 'Online' : formatLastSeen(user.lastSeen)}
                      </Text>
                    </View>
                    <Text style={[styles.lastMessage, { color: theme.colors.textSecondary }]}>
                      Tap to start chatting...
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatDetails: {
    flex: 1,
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
  },
  chatTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
