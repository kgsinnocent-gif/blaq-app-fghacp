
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import TermsOfUse from '../components/TermsOfUse';

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: theme.text,
    borderWidth: 1,
    borderColor: theme.border,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  loginButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  switchText: {
    color: theme.textSecondary,
    fontSize: 14,
  },
  switchLink: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  termsText: {
    color: theme.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  themeToggle: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
});

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('kagiso@blaq.app');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { user, signIn } = useAuth();

  const styles = createStyles(theme);

  useEffect(() => {
    if (user) {
      console.log('User logged in, redirecting to tabs');
      router.replace('/(tabs)/chats');
    }
  }, [user, router]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Attempting login with:', email);
    const { error } = await signIn(email.trim(), password);
    
    if (error) {
      console.log('Login error:', error.message);
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } else {
      console.log('Login successful');
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const handleShowTerms = () => {
    setShowTerms(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.themeToggle}>
        <ThemeToggle />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>BlaqApp</Text>
        <Text style={styles.subtitle}>Email-first messaging</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.switchLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={handleShowTerms}>
            <Text style={styles.termsText}>BlaqApp – Terms of Use</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TermsOfUse visible={showTerms} onClose={() => setShowTerms(false)} />
    </SafeAreaView>
  );
}
