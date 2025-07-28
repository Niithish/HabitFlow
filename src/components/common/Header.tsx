import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../styles/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={theme.colors.white} 
      />
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBackButton && onBackPress ? (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onBackPress}
            >
              <Icon 
                name="arrow-back" 
                size={24} 
                color={theme.colors.textPrimary} 
              />
            </TouchableOpacity>
          ) : leftIcon && onLeftPress ? (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onLeftPress}
            >
              <Icon 
                name={leftIcon} 
                size={24} 
                color={theme.colors.textPrimary} 
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>

        <View style={styles.rightSection}>
          {rightIcon && onRightPress ? (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onRightPress}
            >
              <Icon 
                name={rightIcon} 
                size={24} 
                color={theme.colors.textPrimary} 
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    ...theme.shadows.sm,
  },
  
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Header;