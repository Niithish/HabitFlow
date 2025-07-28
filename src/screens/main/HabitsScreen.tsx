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

const HabitsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Header Section */}
          <Card elevation="md">
            <Text style={styles.headerTitle}>My Habits</Text>
            <Text style={styles.headerSubtitle}>
              Build consistent habits to achieve your goals.
            </Text>
          </Card>

          {/* Add Habit Button */}
          <Button 
            title="Add New Habit" 
            onPress={() => {}} 
            icon="add-circle-outline"
            variant="primary"
            style={styles.addButton}
          />

          {/* Habits List */}
          <Card>
            <Text style={styles.sectionTitle}>Today's Habits</Text>
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateIcon}>🎯</Text>
              <Text style={styles.emptyStateTitle}>No habits yet</Text>
              <Text style={styles.emptyStateText}>
                Start building great habits by adding your first one!
              </Text>
            </View>
          </Card>

          {/* Habit Categories (placeholder) */}
          <Card>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesContainer}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>🏃‍♂️</Text>
                <Text style={styles.categoryName}>Fitness</Text>
                <Text style={styles.categoryCount}>0 habits</Text>
              </View>
              
              <View style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>📚</Text>
                <Text style={styles.categoryName}>Learning</Text>
                <Text style={styles.categoryCount}>0 habits</Text>
              </View>
              
              <View style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>🧘‍♀️</Text>
                <Text style={styles.categoryName}>Wellness</Text>
                <Text style={styles.categoryCount}>0 habits</Text>
              </View>
              
              <View style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>💼</Text>
                <Text style={styles.categoryName}>Work</Text>
                <Text style={styles.categoryCount}>0 habits</Text>
              </View>
            </View>
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
  
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  headerSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  
  addButton: {
    marginBottom: theme.spacing.md,
  },
  
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  
  categoryIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  
  categoryName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  categoryCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});

export default HabitsScreen;