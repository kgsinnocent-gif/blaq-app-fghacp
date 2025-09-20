
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { mockUsers, currentUserId, mockFriendRequests } from '../../data/mockData';

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
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
  },
  actionArrow: {
    marginLeft: 8,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  recentSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  recentTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const friends = mockUsers.filter(user => user.id !== currentUserId);
  const pendingRequests = mockFriendRequests.filter(req => req.status === 'pending');

  const handleNavigateToFriends = () => {
    console.log('Navigating to friends');
    router.push('/(tabs)/friends');
  };

  const handleNavigateToChats = () => {
    console.log('Navigating to chats');
    router.push('/(tabs)/chats');
  };

  const handleNavigateToStatus = () => {
    console.log('Navigating to status');
    router.push('/(tabs)/status');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BlaqApp</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {currentUser?.name || 'User'}!
          </Text>
          <Text style={styles.subtitleText}>
            Stay connected with your friends through email-first messaging
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{friends.length}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{pendingRequests.length}</Text>
              <Text style={styles.statLabel}>Pending Requests</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Active Chats</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleNavigateToFriends}>
            <Ionicons 
              name="person-add" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Add New Friend</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
              style={styles.actionArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleNavigateToChats}>
            <Ionicons 
              name="chatbubble" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Start New Chat</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
              style={styles.actionArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleNavigateToStatus}>
            <Ionicons 
              name="camera" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Share Status</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
              style={styles.actionArrow}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.recentItem}>
            <Ionicons 
              name="person-add" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.recentIcon}
            />
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>New friend request</Text>
              <Text style={styles.recentSubtitle}>From john@example.com</Text>
            </View>
            <Text style={styles.recentTime}>2h ago</Text>
          </View>

          <View style={styles.recentItem}>
            <Ionicons 
              name="chatbubble" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.recentIcon}
            />
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>New message</Text>
              <Text style={styles.recentSubtitle}>From Sarah Johnson</Text>
            </View>
            <Text style={styles.recentTime}>4h ago</Text>
          </View>

          <View style={styles.recentItem}>
            <Ionicons 
              name="radio-button-on" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.recentIcon}
            />
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>Status update</Text>
              <Text style={styles.recentSubtitle}>Mike Chen shared a photo</Text>
            </View>
            <Text style={styles.recentTime}>6h ago</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
