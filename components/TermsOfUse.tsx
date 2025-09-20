
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface TermsOfUseProps {
  visible: boolean;
  onClose: () => void;
}

export default function TermsOfUse({ visible, onClose }: TermsOfUseProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Terms of Use</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.effectiveDate}>Effective Date: 2025</Text>
          
          <Text style={styles.introText}>
            Welcome to BlaqApp, a messaging and social platform created by Se-Mo. By downloading, accessing, or using BlaqApp, you agree to these Terms of Use. Please read them carefully.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Eligibility</Text>
            <Text style={styles.sectionText}>
              You must be at least 13 years old to use BlaqApp.
              {'\n\n'}
              By creating an account, you confirm that the information you provide is true and accurate.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Accounts & Registration</Text>
            <Text style={styles.sectionText}>
              You must register with a valid email address.
              {'\n\n'}
              You are responsible for maintaining the confidentiality of your login credentials.
              {'\n\n'}
              You agree to notify us immediately if you suspect unauthorized use of your account.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Friend Requests & Connections</Text>
            <Text style={styles.sectionText}>
              BlaqApp uses email addresses to help you find and connect with friends.
              {'\n\n'}
              You can send, accept, or decline friend requests.
              {'\n\n'}
              Profiles and chats are only visible after both users accept the request.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Messaging & Content</Text>
            <Text style={styles.sectionText}>
              You are responsible for the messages, media, and content you share.
              {'\n\n'}
              Do not share illegal, abusive, hateful, or harmful content.
              {'\n\n'}
              BlaqApp reserves the right to remove content or suspend accounts that violate these rules.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Privacy</Text>
            <Text style={styles.sectionText}>
              Your personal data is handled according to our Privacy Policy.
              {'\n\n'}
              We do not sell your information.
              {'\n\n'}
              You control who can send you requests and view your profile.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Notifications & Preferences</Text>
            <Text style={styles.sectionText}>
              You may receive in-app notifications for messages, requests, and updates.
              {'\n\n'}
              You can manage notifications and content preferences in Settings.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Restrictions</Text>
            <Text style={styles.sectionText}>
              You agree not to:
              {'\n\n'}
              - Use BlaqApp for spam, fraud, or impersonation.
              {'\n'}
              - Collect user data without permission.
              {'\n'}
              - Interfere with or disrupt the platform.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
            <Text style={styles.sectionText}>
              BlaqApp and its logo, designs, and features are the property of Se-Mo.
              {'\n\n'}
              You may not copy, modify, or distribute BlaqApp materials without permission.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Termination</Text>
            <Text style={styles.sectionText}>
              You may delete your account anytime under Profile → Settings → Account → Delete Account.
              {'\n\n'}
              We may suspend or terminate accounts that violate these Terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
            <Text style={styles.sectionText}>
              BlaqApp is provided "as is".
              {'\n\n'}
              We do not guarantee uninterrupted or error-free service.
              {'\n\n'}
              Se-Mo is not liable for damages resulting from misuse or service interruptions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
            <Text style={styles.sectionText}>
              We may update these Terms periodically. Updates will be posted in the app or on our website. Continued use of BlaqApp means you accept the revised Terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Contact Us</Text>
            <Text style={styles.sectionText}>
              If you have questions about these Terms:
              {'\n\n'}
              📧 Email: info@se-mo.com
              {'\n\n'}
              🌍 Website: www.se-mo.com
            </Text>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  effectiveDate: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginTop: 20,
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  bottomPadding: {
    height: 40,
  },
});
