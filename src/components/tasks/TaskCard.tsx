import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from '../common/Card';
import {theme} from '../../styles/theme';
import {Task} from '../../services/types';
import {getDaysUntilDue, isOverdue} from '../../utils/dateHelpers';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, onToggle, onDelete}) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return 'arrow-up';
      case 'medium':
        return 'remove';
      case 'low':
        return 'arrow-down';
      default:
        return 'remove';
    }
  };

  const getDueDateText = () => {
    if (!task.dueDate) return null;

    const daysUntil = getDaysUntilDue(task.dueDate);
    const isTaskOverdue = isOverdue(task.dueDate);

    if (isTaskOverdue) {
      return `Overdue by ${Math.abs(daysUntil)} days`;
    } else if (daysUntil === 0) {
      return 'Due today';
    } else if (daysUntil === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${daysUntil} days`;
    }
  };

  const getDueDateColor = () => {
    if (!task.dueDate) return theme.colors.textSecondary;

    const daysUntil = getDaysUntilDue(task.dueDate);
    if (isOverdue(task.dueDate)) {
      return theme.colors.error;
    } else if (daysUntil <= 1) {
      return theme.colors.warning;
    }
    return theme.colors.textSecondary;
  };

  return (
    <Card
      style={[
        styles.container,
        task.isCompleted ? styles.completedContainer : undefined,
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.checkButton,
            task.isCompleted && styles.checkButtonCompleted,
          ]}
          onPress={onToggle}>
          {task.isCompleted && (
            <Icon name="checkmark" size={16} color={theme.colors.white} />
          )}
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                task.isCompleted ? styles.completedText : undefined,
              ]}>
              {task.title}
            </Text>
            <View style={styles.priorityContainer}>
              <Icon
                name={getPriorityIcon()}
                size={14}
                color={getPriorityColor()}
              />
            </View>
          </View>

          {task.description && (
            <Text
              style={[
                styles.description,
                task.isCompleted ? styles.completedText : undefined,
              ]}>
              {task.description}
            </Text>
          )}

          <View style={styles.footer}>
            {task.dueDate && (
              <Text style={[styles.dueDate, {color: getDueDateColor()}]}>
                {getDueDateText()}
              </Text>
            )}

            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Icon name="trash-outline" size={16} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
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
  completedContainer: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  checkButtonCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.text,
    flex: 1,
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  priorityContainer: {
    marginLeft: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '500',
  },
  deleteButton: {
    padding: theme.spacing.xs,
  },
});

export default TaskCard;
