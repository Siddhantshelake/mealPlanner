import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '@contexts/OnboardingContext';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';

import {
  UserProfile,
  Gender,
  DietaryPreference,
  Goal,
  CuisineType,
} from '@/types';

import { saveUserProfile } from '@utils/storage';
import { createStyles } from './styles';
import { MessageConstants } from '@constants/MessageConstants';

type SelectOption = {
  label: string;
  value: string;
};

type BaseStep = {
  title: string;
  field: keyof UserProfile;
  validate: (value: any) => boolean;
};

type TextStep = BaseStep & {
  type: typeof MessageConstants.INPUT_TYPE.TEXT;
  placeholder: string;
  options?: never;
};

type NumberStep = BaseStep & {
  type: typeof MessageConstants.INPUT_TYPE.NUMBER;
  placeholder: string;
  options?: never;
};

type SelectStep = BaseStep & {
  type: typeof MessageConstants.INPUT_TYPE.SELECT;
  placeholder?: never;
  options: SelectOption[];
};

type OnboardingStep = TextStep | NumberStep | SelectStep;

const OnboardingScreen = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);
  const { setIsOnboarded } = useOnboarding();

  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    gender: Gender.MALE,
    weight: 0,
    dietaryPreference: DietaryPreference.VEGETARIAN,
    goal: Goal.MAINTAIN,
    cuisineType: CuisineType.MIXED,
  });

  const steps: OnboardingStep[] = [
    {
      title: MessageConstants.LABEL.TELL_US_YOUR_NAME,
      field: 'name',
      type: MessageConstants.INPUT_TYPE.TEXT,
      placeholder: MessageConstants.PLACEHOLDER.YOUR_NAME,
      validate: (value: string) => value.trim().length > 0,
    },
    {
      title: MessageConstants.LABEL.AGE_QUESTION,
      field: 'age',
      type: 'number',
      placeholder: MessageConstants.PLACEHOLDER.YOUR_AGE,
      validate: (value: number) => value > 0 && value < 120,
    },
    {
      title: MessageConstants.LABEL.GENDER_QUESTION,
      field: 'gender',
      type: 'select',
      options: [
        { label: MessageConstants.LABEL.MALE, value: Gender.MALE },
        { label: MessageConstants.LABEL.FEMALE, value: Gender.FEMALE },
        { label: MessageConstants.LABEL.OTHER, value: Gender.OTHER },
      ],
      validate: () => true,
    },
    {
      title: MessageConstants.LABEL.WEIGHT_QUESTION,
      field: 'weight',
      type: 'number',
      placeholder: MessageConstants.PLACEHOLDER.WEIGHT_KG,
      validate: (value: number) => value > 20 && value < 500,
    },
    {
      title: MessageConstants.LABEL.DIET_PREFERENCE,
      field: 'dietaryPreference',
      type: 'select',
      options: [
        {
          label: MessageConstants.LABEL.VEGETARIAN,
          value: DietaryPreference.VEGETARIAN,
        },
        {
          label: MessageConstants.LABEL.NON_VEGETARIAN,
          value: DietaryPreference.NON_VEGETARIAN,
        },
      ],
      validate: () => true,
    },
    {
      title: MessageConstants.LABEL.CUISINE_PREFERENCE,
      field: 'cuisineType',
      type: 'select',
      options: [
        {
          label: MessageConstants.LABEL.INDIAN_CUISINE,
          value: CuisineType.INDIAN,
        },
        {
          label: MessageConstants.LABEL.WESTERN_CUISINE,
          value: CuisineType.WESTERN,
        },
        {
          label: MessageConstants.LABEL.MEDITERRANEAN_CUISINE,
          value: CuisineType.MEDITERRANEAN,
        },
        {
          label: MessageConstants.LABEL.ASIAN_CUISINE,
          value: CuisineType.ASIAN,
        },
        {
          label: MessageConstants.LABEL.MIXED_CUISINE,
          value: CuisineType.MIXED,
        },
      ],
      validate: () => true,
    },
    {
      title: MessageConstants.LABEL.GOAL_QUESTION,
      field: 'goal',
      type: 'select',
      options: [
        { label: MessageConstants.LABEL.LOSE_WEIGHT, value: Goal.WEIGHT_LOSS },
        { label: MessageConstants.LABEL.MAINTAIN_WEIGHT, value: Goal.MAINTAIN },
        { label: MessageConstants.LABEL.GAIN_WEIGHT, value: Goal.WEIGHT_GAIN },
      ],
      validate: () => true,
    },
  ];

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setUserProfile(prevState => ({ ...prevState, [field]: value }));
  };

  const handleTextInput = (field: keyof UserProfile, value: string) => {
    if (field === 'age' || field === 'weight') {
      const numValue = Number(value);
      if (!isNaN(numValue) || value === '') {
        handleInputChange(field, value === '' ? 0 : numValue);
      }
    } else {
      handleInputChange(field, value);
    }
  };

  const handleNext = () => {
    const currentStepObj = steps[currentStep];
    const value = userProfile[currentStepObj.field];

    if (!currentStepObj.validate(value)) {
      Alert.alert(
        MessageConstants.ALERT_TITLE.INVALID_INPUT,
        MessageConstants.ALERT_MESSAGE.ENTER_VALID_VALUE,
      );
      return;
    }

    if (
      currentStepObj.field === 'name' &&
      (!value || typeof value !== 'string' || value.trim() === '')
    ) {
      Alert.alert(
        MessageConstants.ALERT_TITLE.INVALID_NAME,
        MessageConstants.ALERT_MESSAGE.ENTER_NAME,
      );
      return;
    }

    if (currentStep === steps.length - 1) {
      finishOnboarding();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishOnboarding = async () => {
    try {
      await saveUserProfile(userProfile);
      setIsOnboarded(true);
    } catch (error) {
      console.error(MessageConstants.ERROR.SAVE_PROFILE_FAILED, error);
      Alert.alert(
        MessageConstants.ALERT_TITLE.ERROR,
        MessageConstants.ERROR.SAVE_PROFILE_FAILED,
      );
    }
  };

  const renderStep = () => {
    const currentStepObj = steps[currentStep];
    const value = userProfile[currentStepObj.field];

    switch (currentStepObj.type) {
      case MessageConstants.INPUT_TYPE.TEXT:
        return (
          <TextInput
            style={styles.input}
            placeholder={currentStepObj.placeholder}
            placeholderTextColor={colors.TEXT_TERTIARY}
            value={value as string}
            onChangeText={text => handleTextInput(currentStepObj.field, text)}
            autoFocus
          />
        );
      case MessageConstants.INPUT_TYPE.NUMBER:
        return (
          <TextInput
            style={styles.input}
            placeholder={currentStepObj.placeholder}
            placeholderTextColor={colors.TEXT_TERTIARY}
            value={value ? String(value) : ''}
            onChangeText={text => handleTextInput(currentStepObj.field, text)}
            keyboardType="numeric"
            autoFocus
          />
        );
      case MessageConstants.INPUT_TYPE.SELECT:
        return (
          <View style={styles.optionsContainer}>
            {(currentStepObj as SelectStep).options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  value === option.value ? styles.optionSelected : {},
                ]}
                onPress={() => {
                  Keyboard.dismiss();
                  handleInputChange(currentStepObj.field, option.value);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === option.value ? styles.optionTextSelected : {},
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardAvoid}
        enabled
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.content}>
            <Text style={styles.title}>
              {MessageConstants.UI_TEXT.APP_NAME}
            </Text>
            <Text style={styles.subtitle}>
              {MessageConstants.UI_TEXT.APP_SUBTITLE}
            </Text>

            <View style={styles.progressContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentStep ? styles.progressDotActive : {},
                    index < currentStep ? styles.progressDotCompleted : {},
                  ]}
                />
              ))}
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
              {renderStep()}
            </View>

            <View style={styles.buttonContainer}>
              {currentStep > 0 && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => {
                    Keyboard.dismiss();
                    handleBack();
                  }}
                >
                  <Text style={styles.backButtonText}>
                    {MessageConstants.BUTTON.BACK}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  Keyboard.dismiss();
                  handleNext();
                }}
              >
                <Text style={styles.nextButtonText}>
                  {currentStep === steps.length - 1
                    ? MessageConstants.BUTTON.FINISH
                    : MessageConstants.BUTTON.NEXT}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
