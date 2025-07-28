export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isToday = (date: Date | string): boolean => {
  const today = new Date();
  const checkDate = typeof date === 'string' ? new Date(date) : date;

  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (date: Date | string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const checkDate = typeof date === 'string' ? new Date(date) : date;

  return (
    checkDate.getDate() === yesterday.getDate() &&
    checkDate.getMonth() === yesterday.getMonth() &&
    checkDate.getFullYear() === yesterday.getFullYear()
  );
};

export const getDaysInCurrentWeek = (): Date[] => {
  const today = new Date();
  const currentWeekDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentWeekDay);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(day);
  }

  return week;
};

export const getWeekDayName = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

export const getMonthName = (date: Date): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[date.getMonth()];
};

export const getRelativeDateString = (date: Date | string): string => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;

  if (isToday(checkDate)) {
    return 'Today';
  } else if (isYesterday(checkDate)) {
    return 'Yesterday';
  } else {
    return formatDate(checkDate);
  }
};

export const calculateStreak = (completionDates: string[]): number => {
  if (completionDates.length === 0) return 0;

  const sortedDates = completionDates.sort().reverse();
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));

  let streak = 0;
  let currentDate = today;

  // Check if completed today or yesterday to start streak
  if (sortedDates[0] === today) {
    streak = 1;
    currentDate = yesterday;
  } else if (sortedDates[0] === yesterday) {
    streak = 1;
    currentDate = formatDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));
  } else {
    return 0;
  }

  // Count consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] === currentDate) {
      streak++;
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      currentDate = formatDate(prevDate);
    } else {
      break;
    }
  }

  return streak;
};

export const getDaysUntilDue = (dueDate: Date): number => {
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate: Date): boolean => {
  return getDaysUntilDue(dueDate) < 0;
};
