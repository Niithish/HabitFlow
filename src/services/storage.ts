import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Habit, HabitCompletion, Task } from './types';

/**
 * Storage service for local data persistence using AsyncStorage
 */

// Storage keys
const STORAGE_KEYS = {
  USER: '@habitflow:user',
  HABITS: '@habitflow:habits',
  HABIT_COMPLETIONS: '@habitflow:habit_completions',
  TASKS: '@habitflow:tasks',
  APP_STATE: '@habitflow:app_state',
} as const;

// Generic storage functions
export const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data to storage: ${key}`, error);
    throw error;
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data from storage: ${key}`, error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from storage: ${key}`, error);
    throw error;
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all storage data', error);
    throw error;
  }
};

// User storage
export const saveUser = async (user: User): Promise<void> => {
  await setItem(STORAGE_KEYS.USER, user);
};

export const getUser = async (): Promise<User | null> => {
  return await getItem<User>(STORAGE_KEYS.USER);
};

export const removeUser = async (): Promise<void> => {
  await removeItem(STORAGE_KEYS.USER);
};

// Habits storage
export const saveHabits = async (habits: Habit[]): Promise<void> => {
  await setItem(STORAGE_KEYS.HABITS, habits);
};

export const getHabits = async (): Promise<Habit[]> => {
  const habits = await getItem<Habit[]>(STORAGE_KEYS.HABITS);
  return habits || [];
};

export const addHabit = async (habit: Habit): Promise<void> => {
  const habits = await getHabits();
  const updatedHabits = [...habits, habit];
  await saveHabits(updatedHabits);
};

export const updateHabit = async (habitId: string, updates: Partial<Habit>): Promise<void> => {
  const habits = await getHabits();
  const updatedHabits = habits.map(habit =>
    habit.id === habitId ? { ...habit, ...updates, updatedAt: new Date().toISOString() } : habit
  );
  await saveHabits(updatedHabits);
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  const habits = await getHabits();
  const updatedHabits = habits.filter(habit => habit.id !== habitId);
  await saveHabits(updatedHabits);
  
  // Also remove habit completions for this habit
  const completions = await getHabitCompletions();
  const updatedCompletions = completions.filter(completion => completion.habitId !== habitId);
  await saveHabitCompletions(updatedCompletions);
};

// Habit completions storage
export const saveHabitCompletions = async (completions: HabitCompletion[]): Promise<void> => {
  await setItem(STORAGE_KEYS.HABIT_COMPLETIONS, completions);
};

export const getHabitCompletions = async (): Promise<HabitCompletion[]> => {
  const completions = await getItem<HabitCompletion[]>(STORAGE_KEYS.HABIT_COMPLETIONS);
  return completions || [];
};

export const addHabitCompletion = async (completion: HabitCompletion): Promise<void> => {
  const completions = await getHabitCompletions();
  const updatedCompletions = [...completions, completion];
  await saveHabitCompletions(updatedCompletions);
};

export const removeHabitCompletion = async (habitId: string, date: string): Promise<void> => {
  const completions = await getHabitCompletions();
  const updatedCompletions = completions.filter(
    completion => !(completion.habitId === habitId && completion.date === date)
  );
  await saveHabitCompletions(updatedCompletions);
};

export const getHabitCompletionsByDate = async (date: string): Promise<HabitCompletion[]> => {
  const completions = await getHabitCompletions();
  return completions.filter(completion => completion.date === date);
};

export const getHabitCompletionsByHabit = async (habitId: string): Promise<HabitCompletion[]> => {
  const completions = await getHabitCompletions();
  return completions.filter(completion => completion.habitId === habitId);
};

// Tasks storage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  await setItem(STORAGE_KEYS.TASKS, tasks);
};

export const getTasks = async (): Promise<Task[]> => {
  const tasks = await getItem<Task[]>(STORAGE_KEYS.TASKS);
  return tasks || [];
};

export const addTask = async (task: Task): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = [...tasks, task];
  await saveTasks(updatedTasks);
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
  );
  await saveTasks(updatedTasks);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  await saveTasks(updatedTasks);
};

export const getTasksByStatus = async (status: string): Promise<Task[]> => {
  const tasks = await getTasks();
  return tasks.filter(task => task.status === status);
};

export const getTasksByDate = async (date: string): Promise<Task[]> => {
  const tasks = await getTasks();
  return tasks.filter(task => task.dueDate === date);
};

// App state storage
export const saveAppState = async (state: any): Promise<void> => {
  await setItem(STORAGE_KEYS.APP_STATE, state);
};

export const getAppState = async (): Promise<any> => {
  return await getItem(STORAGE_KEYS.APP_STATE);
};

// Utility functions
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const exportData = async (): Promise<{
  user: User | null;
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  tasks: Task[];
}> => {
  const [user, habits, habitCompletions, tasks] = await Promise.all([
    getUser(),
    getHabits(),
    getHabitCompletions(),
    getTasks(),
  ]);
  
  return {
    user,
    habits,
    habitCompletions,
    tasks,
  };
};

export const importData = async (data: {
  user?: User;
  habits?: Habit[];
  habitCompletions?: HabitCompletion[];
  tasks?: Task[];
}): Promise<void> => {
  try {
    if (data.user) {
      await saveUser(data.user);
    }
    if (data.habits) {
      await saveHabits(data.habits);
    }
    if (data.habitCompletions) {
      await saveHabitCompletions(data.habitCompletions);
    }
    if (data.tasks) {
      await saveTasks(data.tasks);
    }
  } catch (error) {
    console.error('Error importing data', error);
    throw error;
  }
};