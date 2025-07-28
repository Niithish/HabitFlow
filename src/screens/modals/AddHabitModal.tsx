import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { theme } from '../../styles/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AddHabitModal: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card elevation="md">
          <Text style={styles.title}>Add New Habit</Text>
          <Text style={styles.subtitle}>
            Habit creation form will be implemented here.
          </Text>
          <Button 
            title="Save Habit"
            onPress={() => {}}
            style={styles.saveButton}
          />
          <Button 
            title="Cancel"
            onPress={() => {}}
            variant="outline"
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  
  saveButton: {
    marginBottom: theme.spacing.md,
  },
});

export default AddHabitModal;