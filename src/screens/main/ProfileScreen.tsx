import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../../components/common/Header';
import {Card} from '../../components/common/Card';
import {Button} from '../../components/common/Button';
import {theme} from '../../styles/theme';
import {StorageService} from '../../services/storage';

const ProfileScreen: React.FC = () => {
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all your habits and tasks? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllData();
              Alert.alert('Success', 'All data has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          },
        },
      ],
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Data export functionality will be available in a future update.',
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'Data import functionality will be available in a future update.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" subtitle="Manage your account and data" />

      <ScrollView style={styles.content}>
        {/* User Info */}
        <Card style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Icon name="person" size={32} color={theme.colors.white} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Demo User</Text>
              <Text style={styles.userEmail}>demo@habitflow.app</Text>
            </View>
          </View>
        </Card>

        {/* App Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>1</Text>
          </View>
        </Card>

        {/* Data Management */}
        <Card style={styles.dataCard}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <Button
            title="Export Data"
            onPress={handleExportData}
            variant="outline"
            style={styles.actionButton}
          />

          <Button
            title="Import Data"
            onPress={handleImportData}
            variant="outline"
            style={styles.actionButton}
          />

          <Button
            title="Clear All Data"
            onPress={handleClearData}
            variant="outline"
            style={[styles.actionButton, styles.dangerButton]}
            textStyle={styles.dangerText}
          />
        </Card>

        {/* About */}
        <Card style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>About HabitFlow</Text>
          <Text style={styles.aboutText}>
            HabitFlow is a habit tracker and daily task manager designed to help
            you build consistent habits and stay organized with your daily
            tasks.
          </Text>
          <Text style={styles.aboutText}>
            Built with React Native for cross-platform mobile experience.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  userCard: {
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  infoCard: {
    marginBottom: theme.spacing.lg,
  },
  dataCard: {
    marginBottom: theme.spacing.lg,
  },
  aboutCard: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  infoValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  actionButton: {
    marginBottom: theme.spacing.md,
  },
  dangerButton: {
    borderColor: theme.colors.error,
  },
  dangerText: {
    color: theme.colors.error,
  },
  aboutText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
});

export default ProfileScreen;
