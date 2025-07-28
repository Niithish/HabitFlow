// Base types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  frequency: HabitFrequency;
  targetDays: number[]; // Days of week (0 = Sunday, 1 = Monday, etc.)
  streak: number;
  longestStreak: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: string;
  date: string; // YYYY-MM-DD format
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Enums
export enum HabitFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  CUSTOM = 'custom',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  AddHabitModal: {
    habit?: Habit;
  };
  AddTaskModal: {
    task?: Task;
  };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Habits: undefined;
  Tasks: undefined;
  Profile: undefined;
};

// Form types
export interface HabitFormData {
  title: string;
  description?: string;
  color: string;
  icon: string;
  frequency: HabitFrequency;
  targetDays: number[];
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// State types
export interface AppState {
  user: User | null;
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

// Utility types
export interface DashboardStats {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  streakCount: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

export interface WeeklyProgress {
  date: string;
  completed: boolean;
  habitCount: number;
  completedCount: number;
}

// Component prop types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: any;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  elevation?: 'sm' | 'md' | 'lg';
}