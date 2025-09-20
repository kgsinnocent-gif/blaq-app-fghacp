
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SupabaseService } from '../../services/supabaseService';

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.background,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  editProfileButton: {
    backgroundColor: theme.surface,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  editProfileText: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.background,
  },
  menuItemIcon: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
  },
  menuItemBadge: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  menuItemBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuItemArrow: {
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: theme.text,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: theme.border,
  },
  saveButton: {
    backgroundColor: theme.primary,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: theme.text,
  },
  saveButtonText: {
    color: 'white',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requestAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  requestEmail: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  requestActions: {
    flexDirection: 'row',
  },
  requestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: theme.primary,
  },
  declineButton: {
    backgroundColor: theme.border,
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButtonText: {
    color: 'white',
  },
  declineButtonText: {
    color: theme.text,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  switchText: {
    fontSize: 16,
    color: theme.text,
    flex: 1,
  },
});

export default function SettingsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [darkMode, setDarkMode] = useState(theme.isDark);

  const styles = createStyles(theme);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadFriendRequests();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const profileData = await SupabaseService.getProfile(user.id);
    if (profileData) {
      setProfile(profileData);
      setEditDisplayName(profileData.display_name);
      setEditBio(profileData.bio || '');
    }
  };

  const loadFriendRequests = async () => {
    if (!user) return;
    
    const requests = await SupabaseService.getFriendRequests(user.id);
    const incomingRequests = requests.filter(req => req.to_user_id === user.id);
    
    // Get profile data for each request sender
    const requestsWithProfiles = await Promise.all(
      incomingRequests.map(async (request) => {
        const senderProfile = await SupabaseService.getProfile(request.from_user_id!);
        return {
          ...request,
          senderProfile
        };
      })
    );
    
    setFriendRequests(requestsWithProfiles.filter(req => req.senderProfile));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEditProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      // In a real app, you would upload this to Supabase Storage
      // For now, we'll just show an alert
      Alert.alert('Feature Coming Soon', 'Profile picture upload will be available soon!');
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;

    const { error } = await SupabaseService.updateProfile(user.id, {
      display_name: editDisplayName,
      bio: editBio,
    });

    if (error) {
      Alert.alert('Error', 'Failed to update profile');
    } else {
      setProfile({
        ...profile,
        display_name: editDisplayName,
        bio: editBio,
      });
      setShowEditProfile(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    const { error } = await SupabaseService.acceptFriendRequest(requestId);
    
    if (error) {
      Alert.alert('Error', 'Failed to accept friend request');
    } else {
      Alert.alert('Success', 'Friend request accepted!');
      loadFriendRequests(); // Reload requests
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    const { error } = await SupabaseService.declineFriendRequest(requestId);
    
    if (error) {
      Alert.alert('Error', 'Failed to decline friend request');
    } else {
      loadFriendRequests(); // Reload requests
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', 'Failed to logout');
            } else {
              router.replace('/login');
            }
          },
        },
      ]
    );
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.textSecondary }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {profile.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{getInitials(profile.display_name)}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditProfilePicture}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.displayName}>{profile.display_name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

          <TouchableOpacity style={styles.editProfileButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Pending Requests */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setShowPendingRequests(true)}>
            <View style={styles.menuItemIcon}>
              <Ionicons name="person-add" size={24} color={theme.primary} />
            </View>
            <Text style={styles.menuItemText}>Pending Requests</Text>
            {friendRequests.length > 0 && (
              <View style={styles.menuItemBadge}>
                <Text style={styles.menuItemBadgeText}>{friendRequests.length}</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={styles.menuItemArrow} />
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={darkMode ? 'white' : theme.textSecondary}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Ionicons name="notifications" size={24} color={theme.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={styles.menuItemArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Ionicons name="shield-checkmark" size={24} color={theme.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={styles.menuItemArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Ionicons name="help-circle" size={24} color={theme.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={styles.menuItemArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Ionicons name="information-circle" size={24} color={theme.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={styles.menuItemArrow} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={showEditProfile} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              placeholderTextColor={theme.textSecondary}
              value={editDisplayName}
              onChangeText={setEditDisplayName}
            />
            
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Bio (optional)"
              placeholderTextColor={theme.textSecondary}
              value={editBio}
              onChangeText={setEditBio}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditProfile(false)}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveProfile}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pending Requests Modal */}
      <Modal visible={showPendingRequests} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pending Requests</Text>
            
            {friendRequests.length === 0 ? (
              <Text style={{ color: theme.textSecondary, textAlign: 'center', marginVertical: 20 }}>
                No pending requests
              </Text>
            ) : (
              <ScrollView style={{ maxHeight: 300 }}>
                {friendRequests.map((request) => (
                  <View key={request.id} style={styles.requestItem}>
                    <View style={styles.requestAvatar}>
                      <Text style={styles.requestAvatarText}>
                        {getInitials(request.senderProfile.display_name)}
                      </Text>
                    </View>
                    
                    <View style={styles.requestInfo}>
                      <Text style={styles.requestName}>{request.senderProfile.display_name}</Text>
                      <Text style={styles.requestEmail}>{request.senderProfile.email}</Text>
                    </View>
                    
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={[styles.requestButton, styles.declineButton]}
                        onPress={() => handleDeclineRequest(request.id)}
                      >
                        <Text style={[styles.requestButtonText, styles.declineButtonText]}>Decline</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.requestButton, styles.acceptButton]}
                        onPress={() => handleAcceptRequest(request.id)}
                      >
                        <Text style={[styles.requestButtonText, styles.acceptButtonText]}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
            
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton, { marginTop: 16 }]}
              onPress={() => setShowPendingRequests(false)}
            >
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
