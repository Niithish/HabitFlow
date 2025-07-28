import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../../components/common/Header';
import {Button} from '../../components/common/Button';
import HabitCard from '../../components/habits/HabitCard';
import {theme} from '../../styles/theme';
import {StorageService} from '../../services/storage';
import {Habit} from '../../services/types';
import {RootStackParamList} from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HabitsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadHabits = useCallback(async () => {
    try {
      const loadedHabits = await StorageService.getHabits();
      setHabits(loadedHabits.filter(h => h.isActive));
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHabits();
    setRefreshing(false);
  };

  const handleAddHabit = () => {
    navigation.navigate('AddHabitModal');
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;

      const today = new Date().toISOString().split('T')[0];
      const isCompleted = habit.completionDates.includes(today);

      let updatedCompletionDates;
      let updatedStreak = habit.streak;

      if (isCompleted) {
        // Remove completion
        updatedCompletionDates = habit.completionDates.filter(
          date => date !== today,
        );
        updatedStreak = Math.max(0, habit.streak - 1);
      } else {
        // Add completion
        updatedCompletionDates = [...habit.completionDates, today];
        updatedStreak = habit.streak + 1;
      }

      await StorageService.updateHabit(habitId, {
        completionDates: updatedCompletionDates,
        streak: updatedStreak,
        longestStreak: Math.max(habit.longestStreak, updatedStreak),
      });

      await loadHabits();
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadHabits);
    return unsubscribe;
  }, [navigation, loadHabits]);

  const renderHabit = ({item}: {item: Habit}) => (
    <HabitCard habit={item} onToggle={() => handleToggleHabit(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Habits"
        subtitle={`${habits.length} active habits`}
        rightComponent={
          <Button
            title=""
            onPress={handleAddHabit}
            style={styles.addButton}
            textStyle={styles.addButtonText}>
            <Icon name="add" size={24} color={theme.colors.white} />
          </Button>
        }
      />

      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    padding: 0,
    minHeight: 0,
  },
  addButtonText: {
    fontSize: 0,
  },
});

export default HabitsScreen;
