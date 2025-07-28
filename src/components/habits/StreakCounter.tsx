import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({
  streak,
  longestStreak,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.streakItem}>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakLabel}>Current Streak</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.streakItem}>
        <Text style={styles.streakNumber}>{longestStreak}</Text>
        <Text style={styles.streakLabel}>Best Streak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
  },
  streakItem: {
    alignItems: 'center',
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  streakLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
});

export default StreakCounter;
