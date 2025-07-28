import {
  Habit,
  Task,
  User,
  CreateHabitRequest,
  UpdateHabitRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  ApiResponse,
  DashboardStats,
} from './types';

// Mock API service for future backend integration
export class ApiService {
  private static baseUrl = 'https://api.habitflow.app'; // Placeholder URL

  // Auth endpoints
  static async login(
    email: string,
    _password: string,
  ): Promise<ApiResponse<User>> {
    // Mock implementation - replace with actual API call
    return {
      success: true,
      data: {
        id: '1',
        email,
        name: 'Demo User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }

  static async register(
    email: string,
    _password: string,
    name: string,
  ): Promise<ApiResponse<User>> {
    // Mock implementation - replace with actual API call
    return {
      success: true,
      data: {
        id: '1',
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }

  static async logout(): Promise<ApiResponse> {
    // Mock implementation - replace with actual API call
    return {success: true};
  }

  // Habits endpoints
  static async getHabits(): Promise<ApiResponse<Habit[]>> {
    // Mock implementation - replace with actual API call
    return {success: true, data: []};
  }

  static async createHabit(
    request: CreateHabitRequest,
  ): Promise<ApiResponse<Habit>> {
    // Mock implementation - replace with actual API call
    const habit: Habit = {
      id: Date.now().toString(),
      userId: '1',
      ...request,
      streak: 0,
      longestStreak: 0,
      completionDates: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {success: true, data: habit};
  }

  static async updateHabit(
    _habitId: string,
    _request: UpdateHabitRequest,
  ): Promise<ApiResponse<Habit>> {
    // Mock implementation - replace with actual API call
    return {success: true, data: {} as Habit};
  }

  static async deleteHabit(_habitId: string): Promise<ApiResponse> {
    // Mock implementation - replace with actual API call
    return {success: true};
  }

  static async completeHabit(
    _habitId: string,
    _date: string,
  ): Promise<ApiResponse> {
    // Mock implementation - replace with actual API call
    return {success: true};
  }

  // Tasks endpoints
  static async getTasks(): Promise<ApiResponse<Task[]>> {
    // Mock implementation - replace with actual API call
    return {success: true, data: []};
  }

  static async createTask(
    request: CreateTaskRequest,
  ): Promise<ApiResponse<Task>> {
    // Mock implementation - replace with actual API call
    const task: Task = {
      id: Date.now().toString(),
      userId: '1',
      ...request,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {success: true, data: task};
  }

  static async updateTask(
    _taskId: string,
    _request: UpdateTaskRequest,
  ): Promise<ApiResponse<Task>> {
    // Mock implementation - replace with actual API call
    return {success: true, data: {} as Task};
  }

  static async deleteTask(_taskId: string): Promise<ApiResponse> {
    // Mock implementation - replace with actual API call
    return {success: true};
  }

  // Dashboard endpoints
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    // Mock implementation - replace with actual API call
    return {
      success: true,
      data: {
        totalHabits: 0,
        activeHabits: 0,
        completedToday: 0,
        currentStreak: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      },
    };
  }

  // Helper method for making HTTP requests (for future use)
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }
}
