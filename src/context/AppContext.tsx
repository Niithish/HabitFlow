import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  User,
  Habit,
  HabitCompletion,
  Task,
  AppState,
} from '../services/types';
import * as storage from '../services/storage';

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_HABITS'; payload: Habit[] }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_HABIT'; payload: { id: string; updates: Partial<Habit> } }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'SET_HABIT_COMPLETIONS'; payload: HabitCompletion[] }
  | { type: 'ADD_HABIT_COMPLETION'; payload: HabitCompletion }
  | { type: 'REMOVE_HABIT_COMPLETION'; payload: { habitId: string; date: string } }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string };

// Initial state
const initialState: AppState = {
  user: null,
  habits: [],
  habitCompletions: [],
  tasks: [],
  isLoading: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_HABITS':
      return { ...state, habits: action.payload };
    
    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] };
    
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload.id
            ? { ...habit, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : habit
        ),
      };
    
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload),
        habitCompletions: state.habitCompletions.filter(
          completion => completion.habitId !== action.payload
        ),
      };
    
    case 'SET_HABIT_COMPLETIONS':
      return { ...state, habitCompletions: action.payload };
    
    case 'ADD_HABIT_COMPLETION':
      return {
        ...state,
        habitCompletions: [...state.habitCompletions, action.payload],
      };
    
    case 'REMOVE_HABIT_COMPLETION':
      return {
        ...state,
        habitCompletions: state.habitCompletions.filter(
          completion =>
            !(completion.habitId === action.payload.habitId && completion.date === action.payload.date)
        ),
      };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  loadData: () => Promise<void>;
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on mount
  const loadData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [user, habits, habitCompletions, tasks] = await Promise.all([
        storage.getUser(),
        storage.getHabits(),
        storage.getHabitCompletions(),
        storage.getTasks(),
      ]);

      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_HABITS', payload: habits });
      dispatch({ type: 'SET_HABIT_COMPLETIONS', payload: habitCompletions });
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
      console.error('Error loading data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Add a new habit
  const addHabit = async (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newHabit: Habit = {
        id: storage.generateId(),
        userId: state.user?.id || 'default_user',
        ...habitData,
        streak: 0,
        longestStreak: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await storage.addHabit(newHabit);
      dispatch({ type: 'ADD_HABIT', payload: newHabit });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add habit' });
      console.error('Error adding habit:', error);
    }
  };

  // Toggle habit completion
  const toggleHabitCompletion = async (habitId: string, date: string) => {
    try {
      const existingCompletion = state.habitCompletions.find(
        completion => completion.habitId === habitId && completion.date === date
      );

      if (existingCompletion) {
        // Remove completion
        await storage.removeHabitCompletion(habitId, date);
        dispatch({ type: 'REMOVE_HABIT_COMPLETION', payload: { habitId, date } });
      } else {
        // Add completion
        const newCompletion: HabitCompletion = {
          id: storage.generateId(),
          habitId,
          completedAt: new Date().toISOString(),
          date,
        };

        await storage.addHabitCompletion(newCompletion);
        dispatch({ type: 'ADD_HABIT_COMPLETION', payload: newCompletion });
      }

      // Update habit streak (simplified calculation)
      const habit = state.habits.find(h => h.id === habitId);
      if (habit) {
        const todaysCompletions = state.habitCompletions.filter(
          completion => completion.habitId === habitId
        );
        
        const updates = {
          streak: todaysCompletions.length,
          longestStreak: Math.max(habit.longestStreak, todaysCompletions.length),
        };

        await storage.updateHabit(habitId, updates);
        dispatch({ type: 'UPDATE_HABIT', payload: { id: habitId, updates } });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to toggle habit completion' });
      console.error('Error toggling habit completion:', error);
    }
  };

  // Add a new task
  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask: Task = {
        id: storage.generateId(),
        userId: state.user?.id || 'default_user',
        ...taskData,
        status: taskData.status || 'pending' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await storage.addTask(newTask);
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add task' });
      console.error('Error adding task:', error);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task) return;

      const isCompleted = task.status === 'completed';
      const updates = {
        status: isCompleted ? ('pending' as any) : ('completed' as any),
        completedAt: isCompleted ? undefined : new Date().toISOString(),
      };

      await storage.updateTask(taskId, updates);
      dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, updates } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to toggle task completion' });
      console.error('Error toggling task completion:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const contextValue: AppContextType = {
    state,
    dispatch,
    loadData,
    addHabit,
    toggleHabitCompletion,
    addTask,
    toggleTaskCompletion,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};