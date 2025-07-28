import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../styles/theme';
import Card from '../common/Card';
import { Habit } from '../../services/types';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onPress: (habit: Habit) => void;
  isCompleted?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggle,
  onPress,
  isCompleted = false,
}) => {
  return (
    <Card onPress={() => onPress(habit)} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.habitInfo}>
          <View style={[styles.iconContainer, { backgroundColor: habit.color }]}>
            <Icon name={habit.icon} size={20} color={theme.colors.white} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{habit.title}</Text>
            {habit.description && (
              <Text style={styles.description}>{habit.description}</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
          onPress={() => onToggle(habit.id)}
        >
          {isCompleted && (
            <Icon name="checkmark" size={16} color={theme.colors.white} />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.streakContainer}>
          <Icon name="flame" size={16} color={theme.colors.warning} />
          <Text style={styles.streakText}>{habit.streak} day streak</Text>
        </View>
        
        <Text style={styles.frequency}>
          {habit.frequency === 'daily' ? 'Daily' : `${habit.targetDays.length} days/week`}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  
  habitInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  textContainer: {
    flex: 1,
  },
  
  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  checkboxCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  streakText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  
  frequency: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});

export default HabitCard;