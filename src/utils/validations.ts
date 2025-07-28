export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters long',
    });
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain at least one lowercase letter',
    });
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain at least one uppercase letter',
    });
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain at least one number',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateHabitForm = (data: {
  title: string;
  frequency: string;
  targetCount: number;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({
      field: 'title',
      message: 'Habit title is required',
    });
  }

  if (data.title.length > 50) {
    errors.push({
      field: 'title',
      message: 'Habit title must be 50 characters or less',
    });
  }

  if (!data.frequency) {
    errors.push({
      field: 'frequency',
      message: 'Frequency is required',
    });
  }

  if (data.targetCount < 1) {
    errors.push({
      field: 'targetCount',
      message: 'Target count must be at least 1',
    });
  }

  if (data.targetCount > 100) {
    errors.push({
      field: 'targetCount',
      message: 'Target count cannot exceed 100',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateTaskForm = (data: {
  title: string;
  priority: string;
  dueDate?: Date;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({
      field: 'title',
      message: 'Task title is required',
    });
  }

  if (data.title.length > 100) {
    errors.push({
      field: 'title',
      message: 'Task title must be 100 characters or less',
    });
  }

  if (!data.priority) {
    errors.push({
      field: 'priority',
      message: 'Priority is required',
    });
  }

  if (data.dueDate && data.dueDate < new Date()) {
    errors.push({
      field: 'dueDate',
      message: 'Due date cannot be in the past',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
