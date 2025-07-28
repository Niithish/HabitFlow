import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {Input} from '../../components/common/Input';
import {Button} from '../../components/common/Button';
import {Card} from '../../components/common/Card';
import {theme} from '../../styles/theme';
import {StorageService} from '../../services/storage';
import {Habit, CreateHabitRequest} from '../../services/types';
import {validateHabitForm} from '../../utils/validations';

const COLORS = [
  theme.colors.primary,
  theme.colors.secondary,
  theme.colors.success,
  theme.colors.error,
  theme.colors.warning,
  '#8B5CF6',
  '#F59E0B',
  '#EF4444',
  '#10B981',
  '#3B82F6',
];

const FREQUENCIES = [
  {value: 'daily', label: 'Daily'},
  {value: 'weekly', label: 'Weekly'},
  {value: 'custom', label: 'Custom'},
];

const AddHabitModal: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<CreateHabitRequest>({
    title: '',
    description: '',
    frequency: 'daily',
    targetCount: 1,
    color: theme.colors.primary,
    icon: 'checkmark-circle',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    const validation = validateHabitForm({
      title: formData.title,
      frequency: formData.frequency,
      targetCount: formData.targetCount,
    });

    if (!validation.isValid) {
      const errorMap = validation.errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as {[key: string]: string});
      setErrors(errorMap);
      setLoading(false);
      return;
    }

    try {
      const habit: Habit = {
        id: Date.now().toString(),
        userId: '1', // Mock user ID
        ...formData,
        streak: 0,
        longestStreak: 0,
        completionDates: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await StorageService.addHabit(habit);
      Alert.alert('Success', 'Habit created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ColorSelector = () => (
    <View style={styles.colorContainer}>
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorGrid}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              {backgroundColor: color},
              formData.color === color && styles.selectedColor,
            ]}
            onPress={() => setFormData({...formData, color})}
          />
        ))}
      </View>
    </View>
  );

  const FrequencySelector = () => (
    <View style={styles.frequencyContainer}>
      <Text style={styles.label}>Frequency</Text>
      <View style={styles.frequencyGrid}>
        {FREQUENCIES.map(freq => (
          <TouchableOpacity
            key={freq.value}
            style={[
              styles.frequencyOption,
              formData.frequency === freq.value && styles.selectedFrequency,
            ]}
            onPress={() =>
              setFormData({...formData, frequency: freq.value as any})
            }>
            <Text
              style={[
                styles.frequencyText,
                formData.frequency === freq.value &&
                  styles.selectedFrequencyText,
              ]}>
              {freq.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.form}>
          <Input
            label="Habit Title"
            value={formData.title}
            onChangeText={title => setFormData({...formData, title})}
            placeholder="e.g., Drink 8 glasses of water"
            error={errors.title}
            required
          />

          <Input
            label="Description"
            value={formData.description}
            onChangeText={description =>
              setFormData({...formData, description})
            }
            placeholder="Optional description"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />

          <FrequencySelector />

          <Input
            label="Target Count"
            value={formData.targetCount.toString()}
            onChangeText={text => {
              const count = parseInt(text, 10) || 1;
              setFormData({...formData, targetCount: count});
            }}
            placeholder="1"
            keyboardType="numeric"
            error={errors.targetCount}
            required
          />

          <ColorSelector />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.cancelButton}
        />
        <Button
          title="Create Habit"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </View>
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
  },
  form: {
    margin: theme.spacing.md,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  colorContainer: {
    marginBottom: theme.spacing.lg,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: theme.spacing.sm,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: theme.colors.text,
  },
  frequencyContainer: {
    marginBottom: theme.spacing.lg,
  },
  frequencyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  selectedFrequency: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  frequencyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  selectedFrequencyText: {
    color: theme.colors.white,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  submitButton: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
});

export default AddHabitModal;
