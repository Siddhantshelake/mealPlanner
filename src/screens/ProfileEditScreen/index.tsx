import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  UserProfile,
  Gender,
  DietaryPreference,
  Goal,
  CuisineType,
} from '@/types';
import { getUserProfile, saveUserProfile } from '@utils/storage';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { createStyles } from './styles';
import { MessageConstants } from '@constants/MessageConstants';
import CustomHeader from '@components/CustomHeader';
import { useShowToast } from '@components/Toast';

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { showSuccessToast } = useShowToast();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);
  // Toast functionality is now handled by static methods

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error(MessageConstants.ERROR.LOAD_USER_PROFILE_FAILED, error);
      Alert.alert(
        MessageConstants.ALERT_TITLE.ERROR,
        MessageConstants.ERROR.LOAD_USER_PROFILE_FAILED,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTextInput = (field: keyof UserProfile, value: string) => {
    if (!profile) return;

    if (field === 'age' || field === 'weight') {
      const numValue = parseFloat(value);
      setProfile({
        ...profile,
        [field]: isNaN(numValue) ? 0 : numValue,
      });
    } else {
      setProfile({
        ...profile,
        [field]: value,
      });
    }
  };

  const handleOptionSelect = (field: keyof UserProfile, value: any) => {
    if (!profile) return;

    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const saveProfile = async () => {
    if (!profile) return;

    try {
      await saveUserProfile(profile);
      showSuccessToast(MessageConstants.SUCCESS.PROFILE_UPDATED);
      navigation.goBack();
    } catch (error) {
      console.error(MessageConstants.ERROR.SAVE_PROFILE_FAILED, error);
      Alert.alert(
        MessageConstants.ALERT_TITLE.ERROR,
        MessageConstants.ERROR.SAVE_PROFILE_FAILED,
      );
    }
  };

  if (loading || !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={MessageConstants.UI_TEXT.EDIT_PROFILE} />
        <View style={styles.content}>
          <Text style={styles.loadingText}>
            {MessageConstants.UI_TEXT.LOADING}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={MessageConstants.UI_TEXT.EDIT_PROFILE} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MessageConstants.LABEL.PERSONAL_INFO}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{MessageConstants.LABEL.NAME}</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={text => handleTextInput('name', text)}
              placeholder={MessageConstants.PLACEHOLDER.YOUR_NAME}
              placeholderTextColor={colors.TEXT_TERTIARY}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{MessageConstants.LABEL.AGE}</Text>
            <TextInput
              style={styles.input}
              value={profile.age.toString()}
              onChangeText={text => handleTextInput('age', text)}
              keyboardType="numeric"
              placeholder={MessageConstants.PLACEHOLDER.YOUR_AGE}
              placeholderTextColor={colors.TEXT_TERTIARY}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={styles.label}
            >{`${MessageConstants.LABEL.WEIGHT} (${MessageConstants.UI_TEXT.KG})`}</Text>
            <TextInput
              style={styles.input}
              value={profile.weight.toString()}
              onChangeText={text => handleTextInput('weight', text)}
              keyboardType="numeric"
              placeholder={MessageConstants.PLACEHOLDER.WEIGHT_KG}
              placeholderTextColor={colors.TEXT_TERTIARY}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MessageConstants.LABEL.GENDER_QUESTION}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                profile.gender === Gender.MALE ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('gender', Gender.MALE)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.gender === Gender.MALE
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.MALE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.gender === Gender.FEMALE ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('gender', Gender.FEMALE)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.gender === Gender.FEMALE
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.FEMALE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                styles.fullWidth,
                profile.gender === Gender.OTHER ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('gender', Gender.OTHER)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.gender === Gender.OTHER
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.OTHER}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MessageConstants.LABEL.DIET_PREFERENCE}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                profile.dietaryPreference === DietaryPreference.VEGETARIAN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect(
                  'dietaryPreference',
                  DietaryPreference.VEGETARIAN,
                )
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.dietaryPreference === DietaryPreference.VEGETARIAN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.VEGETARIAN}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.dietaryPreference === DietaryPreference.NON_VEGETARIAN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect(
                  'dietaryPreference',
                  DietaryPreference.NON_VEGETARIAN,
                )
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.dietaryPreference === DietaryPreference.NON_VEGETARIAN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.NON_VEGETARIAN}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MessageConstants.LABEL.CUISINE_PREFERENCE}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                profile.cuisineType === CuisineType.INDIAN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect('cuisineType', CuisineType.INDIAN)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.cuisineType === CuisineType.INDIAN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.INDIAN_CUISINE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.cuisineType === CuisineType.WESTERN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect('cuisineType', CuisineType.WESTERN)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.cuisineType === CuisineType.WESTERN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.WESTERN_CUISINE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.cuisineType === CuisineType.MEDITERRANEAN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect('cuisineType', CuisineType.MEDITERRANEAN)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.cuisineType === CuisineType.MEDITERRANEAN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.MEDITERRANEAN_CUISINE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.cuisineType === CuisineType.ASIAN
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect('cuisineType', CuisineType.ASIAN)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.cuisineType === CuisineType.ASIAN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.ASIAN_CUISINE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                styles.fullWidth,
                profile.cuisineType === CuisineType.MIXED
                  ? styles.optionSelected
                  : {},
              ]}
              onPress={() =>
                handleOptionSelect('cuisineType', CuisineType.MIXED)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  profile.cuisineType === CuisineType.MIXED
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.MIXED_CUISINE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MessageConstants.LABEL.GOAL_QUESTION}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                profile.goal === Goal.WEIGHT_LOSS ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('goal', Goal.WEIGHT_LOSS)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.goal === Goal.WEIGHT_LOSS
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.LOSE_WEIGHT}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                profile.goal === Goal.MAINTAIN ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('goal', Goal.MAINTAIN)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.goal === Goal.MAINTAIN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.MAINTAIN_WEIGHT}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                styles.fullWidth,
                profile.goal === Goal.WEIGHT_GAIN ? styles.optionSelected : {},
              ]}
              onPress={() => handleOptionSelect('goal', Goal.WEIGHT_GAIN)}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.goal === Goal.WEIGHT_GAIN
                    ? styles.optionTextSelected
                    : {},
                ]}
              >
                {MessageConstants.LABEL.GAIN_WEIGHT}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>
            {MessageConstants.BUTTON.SAVE_CHANGES}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
