import {
  User,
  Habit,
  HabitCompletion,
  Task,
  ApiResponse,
  PaginatedResponse,
  LoginFormData,
  RegisterFormData,
  HabitFormData,
  TaskFormData,
} from './types';

/**
 * API service layer for future backend integration
 * Currently using mock implementations that work with local storage
 */

const API_BASE_URL = 'https://api.habitflow.com'; // Future backend URL
const API_VERSION = 'v1';

// API configuration
const config = {
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Mock delay for simulating network requests
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

export const getAuthToken = (): string | null => {
  return authToken;
};

// HTTP client wrapper (future implementation)
const httpClient = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    await mockDelay();
    throw new Error('Backend not implemented yet');
  },
  
  post: async <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    await mockDelay();
    throw new Error('Backend not implemented yet');
  },
  
  put: async <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    await mockDelay();
    throw new Error('Backend not implemented yet');
  },
  
  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    await mockDelay();
    throw new Error('Backend not implemented yet');
  },
};

// Authentication API
export const authAPI = {
  login: async (credentials: LoginFormData): Promise<ApiResponse<{ user: User; token: string }>> => {
    await mockDelay();
    
    // Mock implementation - replace with actual API call
    if (credentials.email === 'demo@habitflow.com' && credentials.password === 'password123') {
      const mockUser: User = {
        id: 'user_1',
        email: credentials.email,
        name: 'Demo User',
        avatar: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock_jwt_token_12345';
      setAuthToken(mockToken);
      
      return {
        success: true,
        data: {
          user: mockUser,
          token: mockToken,
        },
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials',
    };
  },
  
  register: async (userData: RegisterFormData): Promise<ApiResponse<{ user: User; token: string }>> => {
    await mockDelay();
    
    // Mock implementation - replace with actual API call
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      name: userData.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockToken = `mock_jwt_token_${Date.now()}`;
    setAuthToken(mockToken);
    
    return {
      success: true,
      data: {
        user: mockUser,
        token: mockToken,
      },
    };
  },
  
  logout: async (): Promise<ApiResponse<void>> => {
    await mockDelay();
    setAuthToken(null);
    
    return {
      success: true,
    };
  },
  
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    await mockDelay();
    
    // Mock implementation
    const newToken = `refreshed_token_${Date.now()}`;
    setAuthToken(newToken);
    
    return {
      success: true,
      data: {
        token: newToken,
      },
    };
  },
};

// Habits API
export const habitsAPI = {
  getHabits: async (): Promise<ApiResponse<Habit[]>> => {
    await mockDelay();
    // This will be replaced with actual API call
    // For now, return empty array - local storage will be used
    return {
      success: true,
      data: [],
    };
  },
  
  createHabit: async (habitData: HabitFormData): Promise<ApiResponse<Habit>> => {
    await mockDelay();
    
    const mockHabit: Habit = {
      id: `habit_${Date.now()}`,
      userId: 'user_1',
      title: habitData.title,
      description: habitData.description,
      color: habitData.color,
      icon: habitData.icon,
      frequency: habitData.frequency,
      targetDays: habitData.targetDays,
      streak: 0,
      longestStreak: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockHabit,
    };
  },
  
  updateHabit: async (habitId: string, updates: Partial<HabitFormData>): Promise<ApiResponse<Habit>> => {
    await mockDelay();
    // Mock implementation - actual API call would update the habit
    throw new Error('Backend not implemented yet');
  },
  
  deleteHabit: async (habitId: string): Promise<ApiResponse<void>> => {
    await mockDelay();
    // Mock implementation - actual API call would delete the habit
    return {
      success: true,
    };
  },
  
  toggleHabitCompletion: async (habitId: string, date: string): Promise<ApiResponse<HabitCompletion>> => {
    await mockDelay();
    
    const mockCompletion: HabitCompletion = {
      id: `completion_${Date.now()}`,
      habitId,
      completedAt: new Date().toISOString(),
      date,
    };
    
    return {
      success: true,
      data: mockCompletion,
    };
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async (params?: { status?: string; date?: string }): Promise<ApiResponse<Task[]>> => {
    await mockDelay();
    // This will be replaced with actual API call
    return {
      success: true,
      data: [],
    };
  },
  
  createTask: async (taskData: TaskFormData): Promise<ApiResponse<Task>> => {
    await mockDelay();
    
    const mockTask: Task = {
      id: `task_${Date.now()}`,
      userId: 'user_1',
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'pending' as any,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockTask,
    };
  },
  
  updateTask: async (taskId: string, updates: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
    await mockDelay();
    // Mock implementation - actual API call would update the task
    throw new Error('Backend not implemented yet');
  },
  
  deleteTask: async (taskId: string): Promise<ApiResponse<void>> => {
    await mockDelay();
    return {
      success: true,
    };
  },
  
  toggleTaskCompletion: async (taskId: string): Promise<ApiResponse<Task>> => {
    await mockDelay();
    // Mock implementation - actual API call would toggle task completion
    throw new Error('Backend not implemented yet');
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    await mockDelay();
    // Mock implementation
    throw new Error('Backend not implemented yet');
  },
  
  updateProfile: async (updates: Partial<User>): Promise<ApiResponse<User>> => {
    await mockDelay();
    // Mock implementation
    throw new Error('Backend not implemented yet');
  },
  
  uploadAvatar: async (imageUri: string): Promise<ApiResponse<{ avatar: string }>> => {
    await mockDelay();
    // Mock implementation
    throw new Error('Backend not implemented yet');
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    await mockDelay();
    // Mock implementation
    return {
      success: true,
      data: {
        totalHabits: 0,
        activeHabits: 0,
        completedToday: 0,
        streakCount: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        completionRate: 0,
      },
    };
  },
  
  getHabitAnalytics: async (habitId: string): Promise<ApiResponse<any>> => {
    await mockDelay();
    // Mock implementation
    throw new Error('Backend not implemented yet');
  },
};

// Error handling utility
export const handleAPIError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Network status checking
export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    // This would check actual network connectivity
    // For now, assume we're always offline (using local storage)
    return false;
  } catch {
    return false;
  }
};

// Sync service for offline/online data synchronization
export const syncService = {
  syncAll: async (): Promise<void> => {
    // This would sync local data with the backend when online
    console.log('Sync service not implemented yet');
  },
  
  syncHabits: async (): Promise<void> => {
    // Sync habits with backend
    console.log('Habit sync not implemented yet');
  },
  
  syncTasks: async (): Promise<void> => {
    // Sync tasks with backend
    console.log('Task sync not implemented yet');
  },
};