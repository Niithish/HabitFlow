import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../styles/theme';
import { CardProps } from '../../services/types';

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 'sm',
}) => {
  const elevationStyle = elevation === 'sm' ? styles.elevationSm : 
                        elevation === 'md' ? styles.elevationMd : 
                        styles.elevationLg;

  const cardStyle: ViewStyle[] = [
    styles.base,
    elevationStyle,
    style,
  ].filter(Boolean);

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  
  elevationSm: {
    ...theme.shadows.sm,
  },
  
  elevationMd: {
    ...theme.shadows.md,
  },
  
  elevationLg: {
    ...theme.shadows.lg,
  },
});

export default Card;