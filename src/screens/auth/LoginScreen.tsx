import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../../styles/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          
          {/* Logo/Title Section */}
          <View style={styles.header}>
            <Text style={styles.logo}>🌟</Text>
            <Text style={styles.title}>HabitFlow</Text>
            <Text style={styles.subtitle}>
              Build great habits, achieve your goals
            </Text>
          </View>

          {/* Login Form */}
          <Card elevation="md" style={styles.formCard}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
            
            <Button
              title="Create Account"
              onPress={() => {}}
              variant="outline"
              style={styles.registerButton}
            />
          </Card>

          {/* Demo Access */}
          <Card style={styles.demoCard}>
            <Text style={styles.demoTitle}>Demo Access</Text>
            <Text style={styles.demoText}>
              Email: demo@habitflow.com{'\n'}
              Password: password123
            </Text>
            <Button
              title="Try Demo"
              onPress={() => {
                setEmail('demo@habitflow.com');
                setPassword('password123');
              }}
              variant="ghost"
              size="sm"
            />
          </Card>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  
  keyboardView: {
    flex: 1,
  },
  
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  
  logo: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  
  formCard: {
    marginBottom: theme.spacing.md,
  },
  
  formTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  
  loginButton: {
    marginBottom: theme.spacing.md,
  },
  
  registerButton: {
    marginBottom: 0,
  },
  
  demoCard: {
    backgroundColor: theme.colors.gray50,
    borderColor: theme.colors.gray200,
    borderWidth: 1,
  },
  
  demoTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  
  demoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontFamily: 'monospace',
  },
});

export default LoginScreen;