
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { mockUsers, currentUserId, mockFriendRequests } from '../../data/mockData';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [bio, setBio] = useState('Hey there! I am using BlaqApp.');
  const [profileImage, setProfileImage] = useState(null);
  const styles = createStyles(theme);

  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const pendingRequests = mockFriendRequests.filter(req => 
    req.toUser.id === currentUserId && req.status === 'pending'
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        console.log('Profile picture updated:', result.assets[0].uri);
        Alert.alert('Success', 'Profile picture updated!');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting friend request:', requestId);
    Alert.alert('Success', 'Friend request accepted!');
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining friend request:', requestId);
    Alert.alert('Success', 'Friend request declined');
  };

  const handleOpenUserProfile = (user: any) => {
    console.log('Opening user profile:', user.displayName);
    Alert.alert('User Profile', `Viewing ${user.displayName}'s profile\n\nEmail: ${user.email}\nMessage: Hey there! I am using BlaqApp.`, [
      { text: 'Message', onPress: () => handleMessageUser(user) },
      { text: 'Close', style: 'cancel' }
    ]);
  };

  const handleMessageUser = (user: any) => {
    console.log('Starting chat with:', user.displayName);
    Alert.alert('Chat', `Starting chat with ${user.displayName}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleEditProfilePicture}>
            <View style={styles.avatarLarge}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {currentUser ? getInitials(currentUser.displayName) : 'U'}
                </Text>
              )}
              <View style={styles.editIcon}>
                <Ionicons name="camera" size={16} color={theme.colors.text} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.displayName}>
            {currentUser?.displayName || 'User'}
          </Text>
          <Text style={styles.email}>
            {currentUser?.email || 'user@example.com'}
          </Text>
          <TouchableOpacity 
            style={styles.editBioButton}
            onPress={() => setShowEditProfile(true)}
          >
            <Text style={styles.bio}>{bio}</Text>
            <Ionicons name="pencil" size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Requests</Text>
            {pendingRequests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <TouchableOpacity 
                  style={styles.userInfo}
                  onPress={() => handleOpenUserProfile(request.fromUser)}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {getInitials(request.fromUser.displayName)}
                    </Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{request.fromUser.displayName}</Text>
                    <Text style={styles.userEmail}>{request.fromUser.email}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.messageButton}
                    onPress={() => handleMessageUser(request.fromUser)}
                  >
                    <Ionicons name="chatbubble" size={16} color={theme.colors.text} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(request.id)}
                  >
                    <Ionicons name="checkmark" size={16} color={theme.colors.text} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDeclineRequest(request.id)}
                  >
                    <Ionicons name="close" size={16} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowNotifications(true)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>Manage notification preferences</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowPrivacy(true)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Privacy</Text>
                <Text style={styles.settingDescription}>Privacy and security settings</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowHelp(true)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Help & Support</Text>
                <Text style={styles.settingDescription}>Get help and contact support</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowAbout(true)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>About</Text>
                <Text style={styles.settingDescription}>App version and information</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out" size={24} color={theme.colors.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditProfile(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Message</Text>
              <TouchableOpacity onPress={() => setShowEditProfile(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.bioInput}
              placeholder="Write your message..."
              placeholderTextColor={theme.colors.textSecondary}
              value={bio}
              onChangeText={setBio}
              multiline
              maxLength={150}
            />
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={() => {
                setShowEditProfile(false);
                Alert.alert('Success', 'Message updated!');
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Message Alerts</Text>
                  <Text style={styles.notificationDesc}>Get notified when you receive messages</Text>
                </View>
                <Switch
                  value={true}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Friend Requests</Text>
                  <Text style={styles.notificationDesc}>Get notified about friend requests</Text>
                </View>
                <Switch
                  value={true}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Group Chat Notifications</Text>
                  <Text style={styles.notificationDesc}>Notifications for group messages</Text>
                </View>
                <Switch
                  value={false}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Status Showcase</Text>
                  <Text style={styles.notificationDesc}>Notifications when friends post status</Text>
                </View>
                <Switch
                  value={true}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              <TouchableOpacity style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Mute Specific Chats</Text>
                  <Text style={styles.notificationDesc}>Manage muted conversations</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacy}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy</Text>
              <TouchableOpacity onPress={() => setShowPrivacy(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyTitle}>Dark Mode</Text>
                  <Text style={styles.privacyDesc}>Switch between light and dark themes</Text>
                </View>
                <Switch
                  value={theme.isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              <TouchableOpacity style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyTitle}>Friend Requests</Text>
                  <Text style={styles.privacyDesc}>Control who can send you friend requests</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyTitle}>Profile Visibility</Text>
                  <Text style={styles.privacyDesc}>Public / Friends Only</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyTitle}>Block & Report</Text>
                  <Text style={styles.privacyDesc}>Block or report unwanted users</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyTitle}>Safe Mode</Text>
                  <Text style={styles.privacyDesc}>Filter out inappropriate content</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={showHelp}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHelp(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Help & Support</Text>
              <TouchableOpacity onPress={() => setShowHelp(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity style={styles.helpItem}>
                <View style={styles.helpInfo}>
                  <Text style={styles.helpTitle}>FAQs</Text>
                  <Text style={styles.helpDesc}>Find quick answers to common questions</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpItem}>
                <View style={styles.helpInfo}>
                  <Text style={styles.helpTitle}>Report a Problem</Text>
                  <Text style={styles.helpDesc}>Describe issues or bugs, attach screenshots</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              <View style={styles.helpItem}>
                <View style={styles.helpInfo}>
                  <Text style={styles.helpTitle}>Contact Support</Text>
                  <Text style={styles.helpDesc}>📧 Email: info@se-mo.com</Text>
                  <Text style={styles.helpDesc}>🌐 Website: www.se-mo.com/help</Text>
                  <Text style={styles.helpDesc}>📱 In-App: Profile → Help & Support → Contact Us</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAbout}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About BlaqApp</Text>
              <TouchableOpacity onPress={() => setShowAbout(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.aboutText}>
                BlaqApp is a messaging and social platform created by Se-Mo.
                {'\n\n'}
                Our mission is to connect communities through a modern, creative communication app that's built for everyone, inspired by culture, and driven by innovation.
                {'\n\n'}
                Unlike traditional messaging apps, BlaqApp uses email addresses to find and connect with friends, making it simple, secure, and more inclusive. The app is designed to be easy, friendly, and welcoming, so anyone can join and stay connected without barriers.
                {'\n\n'}
                Tagline: BlaqApp – Connecting Beyond.
              </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  avatarText: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: '600',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  editBioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  bio: {
    fontSize: 14,
    color: theme.colors.text,
    maxWidth: 200,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  requestCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  messageButton: {
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: theme.colors.success,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: theme.colors.error,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  logoutSection: {
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
    marginLeft: 8,
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
  bioInput: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  privacyInfo: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  privacyDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  helpDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  aboutText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
});
