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

const TasksScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Header Section */}
          <Card elevation="md">
            <Text style={styles.headerTitle}>Daily Tasks</Text>
            <Text style={styles.headerSubtitle}>
              Stay organized and productive with your daily tasks.
            </Text>
          </Card>

          {/* Add Task Button */}
          <Button 
            title="Add New Task" 
            onPress={() => {}} 
            icon="add-circle-outline"
            variant="primary"
            style={styles.addButton}
          />

          {/* Task Filters */}
          <View style={styles.filterContainer}>
            <Button 
              title="All" 
              onPress={() => {}} 
              variant="outline"
              size="sm"
              style={styles.filterButton}
            />
            <Button 
              title="Pending" 
              onPress={() => {}} 
              variant="ghost"
              size="sm"
              style={styles.filterButton}
            />
            <Button 
              title="Completed" 
              onPress={() => {}} 
              variant="ghost"
              size="sm"
              style={styles.filterButton}
            />
          </View>

          {/* Tasks List */}
          <Card>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateIcon}>📝</Text>
              <Text style={styles.emptyStateTitle}>No tasks yet</Text>
              <Text style={styles.emptyStateText}>
                Add your first task to start organizing your day!
              </Text>
            </View>
          </Card>

          {/* Priority Overview */}
          <Card>
            <Text style={styles.sectionTitle}>Priority Overview</Text>
            <View style={styles.priorityContainer}>
              <View style={styles.priorityItem}>
                <View style={[styles.priorityIndicator, styles.highPriority]} />
                <Text style={styles.priorityLabel}>High Priority</Text>
                <Text style={styles.priorityCount}>0</Text>
              </View>
              
              <View style={styles.priorityItem}>
                <View style={[styles.priorityIndicator, styles.mediumPriority]} />
                <Text style={styles.priorityLabel}>Medium Priority</Text>
                <Text style={styles.priorityCount}>0</Text>
              </View>
              
              <View style={styles.priorityItem}>
                <View style={[styles.priorityIndicator, styles.lowPriority]} />
                <Text style={styles.priorityLabel}>Low Priority</Text>
                <Text style={styles.priorityCount}>0</Text>
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
  
  filterContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  
  filterButton: {
    marginRight: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
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
  
  priorityContainer: {
    gap: theme.spacing.md,
  },
  
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  
  highPriority: {
    backgroundColor: theme.colors.error,
  },
  
  mediumPriority: {
    backgroundColor: theme.colors.warning,
  },
  
  lowPriority: {
    backgroundColor: theme.colors.success,
  },
  
  priorityLabel: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  
  priorityCount: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
});

export default TasksScreen;