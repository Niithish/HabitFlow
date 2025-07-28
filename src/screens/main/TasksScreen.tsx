import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../../components/common/Header';
import {Button} from '../../components/common/Button';
import TaskCard from '../../components/tasks/TaskCard';
import {theme} from '../../styles/theme';
import {StorageService} from '../../services/storage';
import {Task} from '../../services/types';
import {RootStackParamList} from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TasksScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const loadedTasks = await StorageService.getTasks();
      // Sort tasks: incomplete first, then by priority, then by due date
      const sortedTasks = loadedTasks.sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
          return a.isCompleted ? 1 : -1;
        }

        const priorityOrder = {high: 3, medium: 2, low: 1};
        if (a.priority !== b.priority) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleAddTask = () => {
    navigation.navigate('AddTaskModal');
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updates = {
        isCompleted: !task.isCompleted,
        completedAt: !task.isCompleted ? new Date() : undefined,
      };

      await StorageService.updateTask(taskId, updates);
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await StorageService.removeTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation, loadTasks]);

  const renderTask = ({item}: {item: Task}) => (
    <TaskCard
      task={item}
      onToggle={() => handleToggleTask(item.id)}
      onDelete={() => handleDeleteTask(item.id)}
    />
  );

  const activeTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tasks"
        subtitle={`${activeTasks.length} pending, ${completedTasks.length} completed`}
        rightComponent={
          <Button
            title=""
            onPress={handleAddTask}
            style={styles.addButton}
            textStyle={styles.addButtonText}>
            <Icon name="add" size={24} color={theme.colors.white} />
          </Button>
        }
      />

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    padding: 0,
    minHeight: 0,
  },
  addButtonText: {
    fontSize: 0,
  },
});

export default TasksScreen;
