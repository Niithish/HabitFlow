import AsyncStorage from '@react-native-async-storage/async-storage';
import {Habit, Task, HabitCompletion, User} from './types';

const STORAGE_KEYS = {
  USER: '@habitflow_user',
  HABITS: '@habitflow_habits',
  TASKS: '@habitflow_tasks',
  HABIT_COMPLETIONS: '@habitflow_habit_completions',
};

export class StorageService {
  // User storage
  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  }

  static async setUser(user: User): Promise<boolean> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error saving user to storage:', error);
      return false;
    }
  }

  static async removeUser(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      return true;
    } catch (error) {
      console.error('Error removing user from storage:', error);
      return false;
    }
  }

  // Habits storage
  static async getHabits(): Promise<Habit[]> {
    try {
      const habitsData = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
      return habitsData ? JSON.parse(habitsData) : [];
    } catch (error) {
      console.error('Error getting habits from storage:', error);
      return [];
    }
  }

  static async setHabits(habits: Habit[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
      return true;
    } catch (error) {
      console.error('Error saving habits to storage:', error);
      return false;
    }
  }

  static async addHabit(habit: Habit): Promise<boolean> {
    try {
      const habits = await this.getHabits();
      habits.push(habit);
      return await this.setHabits(habits);
    } catch (error) {
      console.error('Error adding habit to storage:', error);
      return false;
    }
  }

  static async updateHabit(
    habitId: string,
    updates: Partial<Habit>,
  ): Promise<boolean> {
    try {
      const habits = await this.getHabits();
      const index = habits.findIndex(h => h.id === habitId);
      if (index !== -1) {
        habits[index] = {...habits[index], ...updates, updatedAt: new Date()};
        return await this.setHabits(habits);
      }
      return false;
    } catch (error) {
      console.error('Error updating habit in storage:', error);
      return false;
    }
  }

  static async removeHabit(habitId: string): Promise<boolean> {
    try {
      const habits = await this.getHabits();
      const filteredHabits = habits.filter(h => h.id !== habitId);
      return await this.setHabits(filteredHabits);
    } catch (error) {
      console.error('Error removing habit from storage:', error);
      return false;
    }
  }

  // Tasks storage
  static async getTasks(): Promise<Task[]> {
    try {
      const tasksData = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return tasksData ? JSON.parse(tasksData) : [];
    } catch (error) {
      console.error('Error getting tasks from storage:', error);
      return [];
    }
  }

  static async setTasks(tasks: Task[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
      return false;
    }
  }

  static async addTask(task: Task): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      tasks.push(task);
      return await this.setTasks(tasks);
    } catch (error) {
      console.error('Error adding task to storage:', error);
      return false;
    }
  }

  static async updateTask(
    taskId: string,
    updates: Partial<Task>,
  ): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      const index = tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks[index] = {...tasks[index], ...updates, updatedAt: new Date()};
        return await this.setTasks(tasks);
      }
      return false;
    } catch (error) {
      console.error('Error updating task in storage:', error);
      return false;
    }
  }

  static async removeTask(taskId: string): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter(t => t.id !== taskId);
      return await this.setTasks(filteredTasks);
    } catch (error) {
      console.error('Error removing task from storage:', error);
      return false;
    }
  }

  // Habit completions storage
  static async getHabitCompletions(): Promise<HabitCompletion[]> {
    try {
      const completionsData = await AsyncStorage.getItem(
        STORAGE_KEYS.HABIT_COMPLETIONS,
      );
      return completionsData ? JSON.parse(completionsData) : [];
    } catch (error) {
      console.error('Error getting habit completions from storage:', error);
      return [];
    }
  }

  static async addHabitCompletion(
    completion: HabitCompletion,
  ): Promise<boolean> {
    try {
      const completions = await this.getHabitCompletions();
      completions.push(completion);
      await AsyncStorage.setItem(
        STORAGE_KEYS.HABIT_COMPLETIONS,
        JSON.stringify(completions),
      );
      return true;
    } catch (error) {
      console.error('Error adding habit completion to storage:', error);
      return false;
    }
  }

  // Clear all data
  static async clearAllData(): Promise<boolean> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.HABITS,
        STORAGE_KEYS.TASKS,
        STORAGE_KEYS.HABIT_COMPLETIONS,
      ]);
      return true;
    } catch (error) {
      console.error('Error clearing all data from storage:', error);
      return false;
    }
  }
}
