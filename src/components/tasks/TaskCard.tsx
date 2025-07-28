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
import { Task, TaskPriority, TaskStatus } from '../../services/types';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onPress: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onPress,
}) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;
  
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return theme.colors.error;
      case TaskPriority.MEDIUM:
        return theme.colors.warning;
      case TaskPriority.LOW:
        return theme.colors.success;
      default:
        return theme.colors.gray400;
    }
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'arrow-up';
      case TaskPriority.MEDIUM:
        return 'remove';
      case TaskPriority.LOW:
        return 'arrow-down';
      default:
        return 'remove';
    }
  };

  return (
    <Card onPress={() => onPress(task)} style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
          onPress={() => onToggle(task.id)}
        >
          {isCompleted && (
            <Icon name="checkmark" size={16} color={theme.colors.white} />
          )}
        </TouchableOpacity>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
            {task.title}
          </Text>
          {task.description && (
            <Text style={[styles.description, isCompleted && styles.descriptionCompleted]}>
              {task.description}
            </Text>
          )}
        </View>
        
        <View style={styles.priorityContainer}>
          <Icon 
            name={getPriorityIcon(task.priority)} 
            size={16} 
            color={getPriorityColor(task.priority)} 
          />
        </View>
      </View>
      
      {task.dueDate && (
        <View style={styles.footer}>
          <Icon name="calendar-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.sm,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  
  checkboxCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  
  taskInfo: {
    flex: 1,
  },
  
  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  
  descriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  
  priorityContainer: {
    marginLeft: theme.spacing.sm,
    marginTop: 2,
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
  
  dueDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
});

export default TaskCard;