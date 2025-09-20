
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import ThemeToggle from '../../components/ThemeToggle';
import { useRouter } from 'expo-router';
import { mockUsers, currentUserId, mockFriendRequests } from '../../data/mockData';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = createStyles(theme);

  // Get current user info
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const friendsCount = mockUsers.filter(user => user.id !== currentUserId).length;
  const pendingRequestsCount = mockFriendRequests.filter(req => req.receiverId === currentUserId).length;

  const handleNavigateToFriends = () => {
    console.log('Navigating to friends tab');
    router.push('/(tabs)/friends');
  };

  const handleNavigateToChats = () => {
    console.log('Navigating to chats tab');
    router.push('/(tabs)/chats');
  };

  const handleNavigateToStatus = () => {
    console.log('Navigating to status tab');
    router.push('/(tabs)/status');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle style={styles.themeToggle} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>
              Welcome back,
            </Text>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {currentUser?.name || 'User'}
            </Text>
          </View>
          
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {currentUser?.name?.charAt(0) || 'U'}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="people" size={24} color={theme.colors.primary} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>
              {friendsCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Friends
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="person-add" size={24} color={theme.colors.warning} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>
              {pendingRequestsCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Requests
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="chatbubbles" size={24} color={theme.colors.success} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>
              3
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Chats
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={handleNavigateToFriends}
          >
            <View style={styles.actionContent}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Ionicons name="people" size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                  Manage Friends
                </Text>
                <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>
                  Add friends, view requests
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={handleNavigateToChats}
          >
            <View style={styles.actionContent}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.success + '20' }]}>
                <Ionicons name="chatbubbles" size={24} color={theme.colors.success} />
              </View>
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                  Start Chatting
                </Text>
                <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>
                  Message your friends
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={handleNavigateToStatus}
          >
            <View style={styles.actionContent}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.warning + '20' }]}>
                <Ionicons name="radio-button-on" size={24} color={theme.colors.warning} />
              </View>
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                  Share Status
                </Text>
                <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>
                  Post updates for friends
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Activity
          </Text>
          
          <View style={[styles.activityCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Ionicons name="person-add" size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                  New friend request
                </Text>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  2 hours ago
                </Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.success + '20' }]}>
                <Ionicons name="chatbubble" size={16} color={theme.colors.success} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                  New message from Sarah
                </Text>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  5 hours ago
                </Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.warning + '20' }]}>
                <Ionicons name="radio-button-on" size={16} color={theme.colors.warning} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                  John posted a new status
                </Text>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  1 day ago
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
  },
  activityContainer: {
    marginBottom: 30,
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
});
