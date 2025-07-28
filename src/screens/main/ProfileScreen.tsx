import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { theme } from '../../styles/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Profile Header */}
          <Card elevation="md">
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/100' }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Demo User</Text>
                <Text style={styles.userEmail}>demo@habitflow.com</Text>
              </View>
            </View>
            <Button 
              title="Edit Profile" 
              onPress={() => {}} 
              variant="outline"
              size="sm"
              style={styles.editButton}
            />
          </Card>

          {/* Statistics */}
          <Card>
            <Text style={styles.sectionTitle}>Your Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Total Habits</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Longest Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Tasks Completed</Text>
              </View>
            </View>
          </Card>

          {/* Settings */}
          <Card>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsContainer}>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingValue}>Enabled</Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingValue}>Light</Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Data Export</Text>
                <Text style={styles.settingValue}>Available</Text>
              </View>
            </View>
          </Card>

          {/* Actions */}
          <Card>
            <Text style={styles.sectionTitle}>Actions</Text>
            <View style={styles.actionsContainer}>
              <Button 
                title="Export Data" 
                onPress={() => {}} 
                variant="outline"
                icon="download-outline"
                style={styles.actionButton}
              />
              <Button 
                title="Reset All Data" 
                onPress={() => {}} 
                variant="ghost"
                icon="trash-outline"
                style={styles.actionButton}
              />
              <Button 
                title="Sign Out" 
                onPress={() => {}} 
                variant="outline"
                icon="log-out-outline"
                style={styles.actionButton}
              />
            </View>
          </Card>

          {/* App Info */}
          <Card>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.appInfo}>HabitFlow v1.0.0</Text>
            <Text style={styles.appDescription}>
              A simple and effective habit tracker and task manager to help you build 
              consistency and achieve your goals.
            </Text>
          </Card>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: theme.spacing.md,
  },
  
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.gray200,
  },
  
  profileInfo: {
    flex: 1,
  },
  
  userName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  userEmail: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  
  editButton: {
    alignSelf: 'flex-start',
  },
  
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  
  statValue: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  
  settingsContainer: {
    gap: theme.spacing.md,
  },
  
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  
  settingValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  
  actionsContainer: {
    gap: theme.spacing.sm,
  },
  
  actionButton: {
    justifyContent: 'flex-start',
  },
  
  appInfo: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  
  appDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.sm,
  },
});

export default ProfileScreen;