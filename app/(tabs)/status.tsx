
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../../components/ThemeToggle';
import { mockStatuses, currentUserId } from '../../data/mockData';
import { Status } from '../../types';

export default function StatusScreen() {
  const { theme } = useTheme();
  const [statuses] = useState<Status[]>(mockStatuses);
  const [myStatus, setMyStatus] = useState<Status | null>(null);

  const recentStatuses = statuses.filter(status => !status.viewedBy.includes(currentUserId));
  const viewedStatuses = statuses.filter(status => status.viewedBy.includes(currentUserId));

  const handleCreateStatus = async () => {
    console.log('Creating new status');
    
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image selected for status:', result.assets[0].uri);
      Alert.alert('Success', 'Status created! (This is a demo)');
      
      // In a real app, you would upload the image and create the status
      const newStatus: Status = {
        id: Date.now().toString(),
        userId: currentUserId,
        user: { id: currentUserId, email: 'kagiso@blaq.app', displayName: 'You' },
        imageUrl: result.assets[0].uri,
        caption: 'My new status!',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        viewedBy: [],
      };
      
      setMyStatus(newStatus);
    }
  };

  const handleViewStatus = (status: Status) => {
    console.log('Viewing status:', status.id);
    Alert.alert('Status Viewer', `Viewing ${status.user.displayName}'s status\n\n"${status.caption}"\n\nThis would open a full-screen status viewer in a real app.`);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return '1 day ago';
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Status</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* My Status Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity style={styles.myStatusContainer} onPress={handleCreateStatus}>
            <View style={styles.statusItem}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.avatarText}>K</Text>
                </View>
                <View style={[styles.addIcon, { backgroundColor: theme.colors.primary }]}>
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusName, { color: theme.colors.text }]}>My Status</Text>
                <Text style={[styles.statusTime, { color: theme.colors.textSecondary }]}>
                  {myStatus ? formatTimeAgo(myStatus.createdAt) : 'Tap to add status update'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Updates Section */}
        {recentStatuses.length > 0 && (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Updates</Text>
            
            {recentStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatarBorder, { borderColor: theme.colors.primary }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                      <Text style={styles.avatarText}>
                        {status.user.displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusName, { color: theme.colors.text }]}>
                    {status.user.displayName}
                  </Text>
                  <Text style={[styles.statusTime, { color: theme.colors.textSecondary }]}>
                    {formatTimeAgo(status.createdAt)}
                  </Text>
                </View>
                <Image source={{ uri: status.imageUrl }} style={styles.statusPreview} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Viewed Updates Section */}
        {viewedStatuses.length > 0 && (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Viewed Updates</Text>
            
            {viewedStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatarBorder, { borderColor: theme.colors.border }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.colors.textSecondary }]}>
                      <Text style={styles.avatarText}>
                        {status.user.displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusName, { color: theme.colors.textSecondary }]}>
                    {status.user.displayName}
                  </Text>
                  <Text style={[styles.statusTime, { color: theme.colors.textSecondary }]}>
                    {formatTimeAgo(status.createdAt)}
                  </Text>
                </View>
                <Image source={{ uri: status.imageUrl }} style={[styles.statusPreview, { opacity: 0.6 }]} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty State */}
        {recentStatuses.length === 0 && viewedStatuses.length === 0 && !myStatus && (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.emptyState}>
              <Ionicons name="radio-button-on" size={64} color={theme.colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No Status Updates</Text>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                Be the first to share a status update with your friends!
              </Text>
            </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  myStatusContainer: {
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 14,
  },
  statusPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
