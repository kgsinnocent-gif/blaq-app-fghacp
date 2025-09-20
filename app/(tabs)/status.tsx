
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { mockStatuses, currentUserId } from '../../data/mockData';
import { Status } from '../../types';

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
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    flex: 1,
  },
  myStatusSection: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  myStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statusAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  statusRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  addStatusButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.background,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statusItemAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  viewedStatusRing: {
    borderColor: theme.colors.textSecondary,
    opacity: 0.5,
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
});

export default function StatusScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [statuses] = useState(mockStatuses);

  const recentStatuses = statuses.filter(status => !status.viewed);
  const viewedStatuses = statuses.filter(status => status.viewed);

  const handleShareStatus = async () => {
    console.log('Sharing new status');
    
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
      console.log('Selected image:', result.assets[0].uri);
      Alert.alert('Status Shared', 'Your status has been posted!');
    }
  };

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
      console.log('Selected image:', result.assets[0].uri);
      Alert.alert('Status Created', 'Your status has been posted!');
    }
  };

  const handleViewStatus = (status: Status) => {
    console.log('Viewing status:', status.id);
    Alert.alert('Status Viewer', `Viewing ${status.user.name}'s status`);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return '1 day ago';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Status</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareStatus}>
          <Ionicons name="camera" size={16} color="white" />
          <Text style={styles.shareButtonText}>Share Status</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.myStatusSection}>
          <TouchableOpacity style={styles.myStatusItem} onPress={handleCreateStatus}>
            <View style={styles.statusAvatar}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>ME</Text>
              </View>
              <View style={styles.addStatusButton}>
                <Ionicons name="add" size={12} color="white" />
              </View>
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusName}>My Status</Text>
              <Text style={styles.statusTime}>Tap to add status update</Text>
            </View>
          </TouchableOpacity>
        </View>

        {recentStatuses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Updates</Text>
            {recentStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={[styles.statusItemAvatar, styles.statusRing]}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {getInitials(status.user.name)}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusName}>{status.user.name}</Text>
                  <Text style={styles.statusTime}>
                    {formatTimeAgo(status.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {viewedStatuses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Viewed Updates</Text>
            {viewedStatuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={styles.statusItem}
                onPress={() => handleViewStatus(status)}
              >
                <View style={[styles.statusItemAvatar, styles.statusRing, styles.viewedStatusRing]}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {getInitials(status.user.name)}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusName}>{status.user.name}</Text>
                  <Text style={styles.statusTime}>
                    {formatTimeAgo(status.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {recentStatuses.length === 0 && viewedStatuses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="radio-button-on-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>
              No status updates yet. Be the first to share something!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
