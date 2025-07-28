/**
 * Validation utility functions for HabitFlow app
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  return { isValid: true };
};

// Habit title validation
export const validateHabitTitle = (title: string): ValidationResult => {
  if (!title.trim()) {
    return { isValid: false, error: 'Habit title is required' };
  }
  
  if (title.trim().length < 3) {
    return { isValid: false, error: 'Habit title must be at least 3 characters long' };
  }
  
  if (title.trim().length > 100) {
    return { isValid: false, error: 'Habit title must be less than 100 characters' };
  }
  
  return { isValid: true };
};

// Task title validation
export const validateTaskTitle = (title: string): ValidationResult => {
  if (!title.trim()) {
    return { isValid: false, error: 'Task title is required' };
  }
  
  if (title.trim().length < 3) {
    return { isValid: false, error: 'Task title must be at least 3 characters long' };
  }
  
  if (title.trim().length > 200) {
    return { isValid: false, error: 'Task title must be less than 200 characters' };
  }
  
  return { isValid: true };
};

// Description validation (optional)
export const validateDescription = (description?: string): ValidationResult => {
  if (!description) {
    return { isValid: true };
  }
  
  if (description.trim().length > 500) {
    return { isValid: false, error: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};

// Target days validation for habits
export const validateTargetDays = (targetDays: number[]): ValidationResult => {
  if (!targetDays || targetDays.length === 0) {
    return { isValid: false, error: 'Please select at least one day' };
  }
  
  if (targetDays.some(day => day < 0 || day > 6)) {
    return { isValid: false, error: 'Invalid day selection' };
  }
  
  return { isValid: true };
};

// Color validation
export const validateColor = (color: string): ValidationResult => {
  if (!color) {
    return { isValid: false, error: 'Please select a color' };
  }
  
  // Check if it's a valid hex color
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(color)) {
    return { isValid: false, error: 'Invalid color format' };
  }
  
  return { isValid: true };
};

// Icon validation
export const validateIcon = (icon: string): ValidationResult => {
  if (!icon.trim()) {
    return { isValid: false, error: 'Please select an icon' };
  }
  
  return { isValid: true };
};

// Date validation
export const validateDate = (date: string): ValidationResult => {
  if (!date) {
    return { isValid: true }; // Optional field
  }
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  
  return { isValid: true };
};

// Future date validation
export const validateFutureDate = (date: string): ValidationResult => {
  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  if (date) {
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateObj < today) {
      return { isValid: false, error: 'Date cannot be in the past' };
    }
  }
  
  return { isValid: true };
};

// Form validation helper
export const validateForm = (fields: { [key: string]: any }, validators: { [key: string]: (value: any) => ValidationResult }): { isValid: boolean; errors: { [key: string]: string } } => {
  const errors: { [key: string]: string } = {};
  let isValid = true;
  
  Object.keys(validators).forEach(field => {
    const validation = validators[field](fields[field]);
    if (!validation.isValid && validation.error) {
      errors[field] = validation.error;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};

// Generic required field validation
export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (typeof value === 'string' && !value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};