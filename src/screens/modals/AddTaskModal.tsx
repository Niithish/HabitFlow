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
import {Task, CreateTaskRequest} from '../../services/types';
import {validateTaskForm} from '../../utils/validations';

const PRIORITIES = [
  {value: 'low', label: 'Low', color: theme.colors.success},
  {value: 'medium', label: 'Medium', color: theme.colors.warning},
  {value: 'high', label: 'High', color: theme.colors.error},
];

const AddTaskModal: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [dueDateString, setDueDateString] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    // Parse due date if provided
    let dueDate: Date | undefined;
    if (dueDateString.trim()) {
      dueDate = new Date(dueDateString);
      if (isNaN(dueDate.getTime())) {
        setErrors({dueDate: 'Invalid date format'});
        setLoading(false);
        return;
      }
    }

    const validation = validateTaskForm({
      ...formData,
      dueDate,
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
      const task: Task = {
        id: Date.now().toString(),
        userId: '1', // Mock user ID
        ...formData,
        dueDate,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await StorageService.addTask(task);
      Alert.alert('Success', 'Task created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PrioritySelector = () => (
    <View style={styles.priorityContainer}>
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityGrid}>
        {PRIORITIES.map(priority => (
          <TouchableOpacity
            key={priority.value}
            style={[
              styles.priorityOption,
              {borderColor: priority.color},
              formData.priority === priority.value && {
                backgroundColor: priority.color,
              },
            ]}
            onPress={() =>
              setFormData({...formData, priority: priority.value as any})
            }>
            <Text
              style={[
                styles.priorityText,
                {color: priority.color},
                formData.priority === priority.value && {
                  color: theme.colors.white,
                },
              ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const setTodayDueDate = () => {
    const today = new Date();
    setDueDateString(formatDateForInput(today));
  };

  const setTomorrowDueDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDueDateString(formatDateForInput(tomorrow));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.form}>
          <Input
            label="Task Title"
            value={formData.title}
            onChangeText={title => setFormData({...formData, title})}
            placeholder="e.g., Buy groceries"
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

          <PrioritySelector />

          <View style={styles.dueDateContainer}>
            <Input
              label="Due Date (Optional)"
              value={dueDateString}
              onChangeText={setDueDateString}
              placeholder="YYYY-MM-DD"
              error={errors.dueDate}
            />

            <View style={styles.dueDateButtons}>
              <Button
                title="Today"
                onPress={setTodayDueDate}
                variant="outline"
                size="small"
                style={styles.dueDateButton}
              />
              <Button
                title="Tomorrow"
                onPress={setTomorrowDueDate}
                variant="outline"
                size="small"
                style={styles.dueDateButton}
              />
            </View>
          </View>
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
          title="Create Task"
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
  priorityContainer: {
    marginBottom: theme.spacing.lg,
  },
  priorityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  priorityText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
  },
  dueDateContainer: {
    marginBottom: theme.spacing.lg,
  },
  dueDateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -theme.spacing.md,
  },
  dueDateButton: {
    flex: 0.4,
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

export default AddTaskModal;
