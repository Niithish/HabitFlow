import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TaskCard from './TaskCard';
import {Task} from '../../services/types';
import {theme} from '../../styles/theme';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  title?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  title,
}) => {
  const renderTask = ({item}: {item: Task}) => (
    <TaskCard
      task={item}
      onToggle={() => onToggleTask(item.id)}
      onDelete={() => onDeleteTask(item.id)}
    />
  );

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {title ? `No ${title.toLowerCase()} yet` : 'No tasks yet'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default TaskList;
