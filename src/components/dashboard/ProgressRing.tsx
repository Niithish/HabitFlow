import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = theme.colors.primary,
  backgroundColor = theme.colors.border,
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  // These will be used when implementing SVG circles
  // const circumference = radius * 2 * Math.PI;
  // const strokeDasharray = circumference;
  // const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <View style={styles.svgContainer}>
        {/* Background circle */}
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
            },
          ]}
        />

        {/* Progress circle - simplified version without SVG */}
        <View
          style={[
            styles.progressCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: progress > 0 ? color : 'transparent',
              transform: [
                {rotate: '-90deg'},
                {
                  rotateZ: `${(progress / 100) * 360}deg`,
                },
              ],
            },
          ]}
        />
      </View>

      {showPercentage && (
        <View style={styles.textContainer}>
          <Text style={[styles.percentageText, {color}]}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default ProgressRing;
