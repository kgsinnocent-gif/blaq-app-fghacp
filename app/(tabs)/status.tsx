
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { mockStatuses, currentUserId } from '../../data/mockData';
import { Status } from '../../types';

export default function StatusScreen() {
  const { theme } = useTheme();
  const [statuses, setStatuses] = useState(mockStatuses);
  const styles = createStyles(theme);

  const myStatuses = statuses.filter(status => status.userId === currentUserId);
  const friendStatuses = statuses.filter(status => status.userId !== currentUserId);
  const recentStatuses = friendStatuses.filter(status => !status.viewedBy.includes(currentUserId));
  const viewedStatuses = friendStatuses.filter(status => status.viewedBy.includes(currentUserId));

  const handleShareStatus = () => {
    console.log('Share status button pressed');
    handleCreateStatus();
  };

  const handleCreateStatus = async () => {
    try {
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

      if (!result.canceled && result.assets[0]) {
        console.log('Image selected for status:', result.assets[0].uri);
        Alert.alert('Status Created', 'Your status has been posted!');
        // Here you would normally upload the image and create the status
      }
    } catch (error) {
      console.error('Error creating status:', error);
      Alert.alert('Error', 'Failed to create status');
    }
  };

  const handleViewStatus = (status: Status) => {
    console.log('Viewing status:', status.id);
    Alert.alert('Status Viewer', `Viewing ${status.user.displayName}'s status`);
    
    // Mark as viewed
    if (!status.viewedBy.includes(currentUserId)) {
      const updatedStatuses = statuses.map(s => 
        s.id === status.id 
          ? { ...s, viewedBy: [...s.viewedBy, currentUserId] }
          : s
      );
      setStatuses(updatedStatuses);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Status</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareStatus}
        >
          <Ionicons name="camera" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* My Status */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.myStatusCard} onPress={handleCreateStatus}>
            <View style={styles.statusAvatar}>
              <Text style={styles.avatarText}>
                {getInitials('Kagiso')}
              </Text>
              <View style={styles.addStatusIcon}>
                <Ionicons name="add" size={16} color={theme.colors.text} />
              </View>
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusName}>My Status</Text>
              <Text style={styles.statusTime}>
                {myStatuses.length > 0 ? 'Tap to add to your story' : 'Tap to add status'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Updates */}
        {recentStatuses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Updates</Text>
            {recentStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={[styles.statusAvatar, styles.unviewedBorder]}>
                  <Text style={styles.avatarText}>
                    {getInitials(status.user.displayName)}
                  </Text>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusName}>{status.user.displayName}</Text>
                  <Text style={styles.statusTime}>{formatTimeAgo(status.createdAt)}</Text>
                </View>
                <View style={styles.statusPreview}>
                  <Image source={{ uri: status.imageUrl }} style={styles.previewImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Viewed Updates */}
        {viewedStatuses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Viewed Updates</Text>
            {viewedStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={[styles.statusAvatar, styles.viewedBorder]}>
                  <Text style={styles.avatarText}>
                    {getInitials(status.user.displayName)}
                  </Text>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusName}>{status.user.displayName}</Text>
                  <Text style={styles.statusTime}>{formatTimeAgo(status.createdAt)}</Text>
                </View>
                <View style={styles.statusPreview}>
                  <Image source={{ uri: status.imageUrl }} style={styles.previewImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty State */}
        {recentStatuses.length === 0 && viewedStatuses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="radio-button-on-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Status Updates</Text>
            <Text style={styles.emptyDescription}>
              When your friends post status updates, they'll appear here
            </Text>
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
  shareButton: {
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
  myStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statusAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  unviewedBorder: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  viewedBorder: {
    borderWidth: 3,
    borderColor: theme.colors.border,
  },
  avatarText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  addStatusIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: theme.colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  statusInfo: {
    flex: 1,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  statusPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
