import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {theme} from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | (ViewStyle | undefined)[];
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  shadow = true,
}) => {
  const cardStyle = [
    styles.base,
    shadow && theme.shadows.md,
    styles[padding],
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  none: {
    padding: 0,
  },
  small: {
    padding: theme.spacing.sm,
  },
  medium: {
    padding: theme.spacing.md,
  },
  large: {
    padding: theme.spacing.lg,
  },
});
