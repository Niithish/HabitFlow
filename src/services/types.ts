export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  color: string;
  icon: string;
  streak: number;
  longestStreak: number;
  completionDates: string[]; // ISO date strings
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // ISO date string
  count: number;
  createdAt: Date;
}

export interface DashboardStats {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  currentStreak: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateHabitRequest {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  color: string;
  icon: string;
}

export interface UpdateHabitRequest extends Partial<CreateHabitRequest> {
  isActive?: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  isCompleted?: boolean;
}
