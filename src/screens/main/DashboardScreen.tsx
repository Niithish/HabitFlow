import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/common/Header';
import {Card} from '../../components/common/Card';
import {theme} from '../../styles/theme';
import {StorageService} from '../../services/storage';
import {DashboardStats} from '../../services/types';
import {formatDate} from '../../utils/dateHelpers';

const DashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalHabits: 0,
    activeHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      const habits = await StorageService.getHabits();
      const tasks = await StorageService.getTasks();

      const today = formatDate(new Date());
      const completedToday = habits.filter(habit =>
        habit.completionDates.includes(today),
      ).length;

      const activeTasks = tasks.filter(task => !task.isCompleted);
      const completedTasks = tasks.filter(task => task.isCompleted);

      setStats({
        totalHabits: habits.length,
        activeHabits: habits.filter(h => h.isActive).length,
        completedToday,
        currentStreak: habits.reduce(
          (max, habit) => Math.max(max, habit.streak),
          0,
        ),
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        pendingTasks: activeTasks.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const completionPercentage =
    stats.activeHabits > 0
      ? Math.round((stats.completedToday / stats.activeHabits) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" subtitle="Your progress overview" />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Today's Progress */}
        <Card style={styles.progressCard}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{completionPercentage}%</Text>
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>
                {stats.completedToday} of {stats.activeHabits} habits completed
              </Text>
            </View>
          </View>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalHabits}</Text>
            <Text style={styles.statLabel}>Total Habits</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending Tasks</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completedTasks}</Text>
            <Text style={styles.statLabel}>Completed Tasks</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Text style={styles.actionText}>• Check off today's habits</Text>
          <Text style={styles.actionText}>• Add new tasks for today</Text>
          <Text style={styles.actionText}>• Review your progress</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  progressCard: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.white,
  },
  progressInfo: {
    flex: 1,
  },
  progressLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  statCard: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  actionCard: {
    marginTop: theme.spacing.md,
  },
  actionText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
});

export default DashboardScreen;
