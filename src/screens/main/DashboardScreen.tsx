import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { theme } from '../../styles/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Welcome Section */}
          <Card elevation="md">
            <Text style={styles.welcomeTitle}>Good Morning! 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Let's make today productive and build great habits.
            </Text>
          </Card>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Habits</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Completed Today</Text>
            </Card>
          </View>

          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </Card>
          </View>

          {/* Quick Actions */}
          <Card>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.buttonContainer}>
              <Button 
                title="Add Habit" 
                onPress={() => {}} 
                icon="add-circle-outline"
                variant="primary"
                style={styles.actionButton}
              />
              <Button 
                title="Add Task" 
                onPress={() => {}} 
                icon="list-outline"
                variant="secondary"
                style={styles.actionButton}
              />
            </View>
          </Card>

          {/* Today's Progress */}
          <Card>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <Text style={styles.emptyState}>
              No habits or tasks for today. Start by adding your first habit!
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
  
  welcomeTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  welcomeSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  
  statCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    alignItems: 'center',
    marginBottom: 0,
  },
  
  statNumber: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  
  emptyState: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DashboardScreen;