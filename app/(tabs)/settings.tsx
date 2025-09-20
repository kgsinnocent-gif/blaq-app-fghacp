
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

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
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  themeOptionSelected: {
    backgroundColor: theme.colors.primary + '20',
  },
  themeOptionText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  themeOptionDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 12,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const handleThemeChange = (isDark: boolean) => {
    console.log('Theme change requested:', isDark ? 'dark' : 'light');
    if (theme.isDark !== isDark) {
      toggleTheme();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <TouchableOpacity
            style={[
              styles.themeOption,
              !theme.isDark && styles.themeOptionSelected,
            ]}
            onPress={() => handleThemeChange(false)}
          >
            <View style={styles.radioButton}>
              {!theme.isDark && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.themeOptionText}>Light Theme</Text>
              <Text style={styles.themeOptionDescription}>
                Bright and clean appearance
              </Text>
            </View>
            <Ionicons 
              name="sunny" 
              size={24} 
              color={theme.colors.primary} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              theme.isDark && styles.themeOptionSelected,
            ]}
            onPress={() => handleThemeChange(true)}
          >
            <View style={styles.radioButton}>
              {theme.isDark && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.themeOptionText}>Dark Theme</Text>
              <Text style={styles.themeOptionDescription}>
                Easy on the eyes, perfect for low light
              </Text>
            </View>
            <Ionicons 
              name="moon" 
              size={24} 
              color={theme.colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="person-outline" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Profile</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="shield-outline" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Privacy</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="notifications-outline" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.settingIcon}
              />
              <View>
                <Text style={styles.settingText}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive notifications for messages and friend requests
                </Text>
              </View>
            </View>
            <Switch
              value={true}
              onValueChange={(value) => console.log('Notifications toggled:', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="help-circle-outline" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="information-circle-outline" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>About BlaqApp</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
