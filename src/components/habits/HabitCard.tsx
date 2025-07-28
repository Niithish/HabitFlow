import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from '../common/Card';
import {theme} from '../../styles/theme';
import {Habit} from '../../services/types';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({habit, onToggle}) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completionDates.includes(today);

  const getFrequencyText = () => {
    switch (habit.frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      default:
        return 'Custom';
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View
            style={[styles.colorIndicator, {backgroundColor: habit.color}]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{habit.title}</Text>
            {habit.description && (
              <Text style={styles.description}>{habit.description}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.checkButton,
            isCompletedToday && styles.checkButtonCompleted,
          ]}
          onPress={onToggle}>
          {isCompletedToday && (
            <Icon name="checkmark" size={20} color={theme.colors.white} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.streakContainer}>
          <Icon name="flame" size={16} color={theme.colors.warning} />
          <Text style={styles.streakText}>{habit.streak} day streak</Text>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.frequencyText}>{getFrequencyText()}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.targetText}>Target: {habit.targetCount}x</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  checkButtonCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frequencyText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  separator: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.xs,
  },
  targetText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
});

export default HabitCard;
