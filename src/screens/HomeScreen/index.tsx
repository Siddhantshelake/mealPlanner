import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { UserProfile } from '@/types';
import { getUserProfile } from '@utils/storage';
import { generateMealPlan } from '@/services/mealPlannerService';
import { saveMealPlan } from '@utils/storage';
import { createStyles } from './styles';
import { MessageConstants } from '@constants/MessageConstants';
import CustomAlert from '@components/CustomAlert';
import { useShowToast } from '@components/Toast';

type RootStackParamList = {
  MealPlan: { mealPlanId?: string };
  History: undefined;
  Home: undefined;
  Main: undefined;
  Onboarding: undefined;
  Settings: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // Get toast functionality through hook
  const { showSuccessToast } = useShowToast();

  // Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Get theme and colors
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Create styles based on theme
  const styles = createStyles(colors);

  // Helper to show alerts
  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Hide alert
  const hideAlert = () => {
    setAlertVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setAlertVisible(false);
    }, []),
  );

  useEffect(() => {
    if (isFocused) {
      const loadUserProfile = async () => {
        try {
          const profile = await getUserProfile();
          setUserProfile(profile);
        } catch (error) {
          console.error(MessageConstants.ERROR.LOAD_USER_PROFILE_FAILED, error);
          showAlert(
            MessageConstants.ALERT_TITLE.ERROR,
            MessageConstants.ERROR.LOAD_USER_PROFILE_FAILED,
          );
        }
      };

      loadUserProfile();
    }
  }, [isFocused]);

  const handleGenerateMealPlan = async () => {
    if (!userProfile) {
      showAlert(
        MessageConstants.ALERT_TITLE.ERROR,
        MessageConstants.ALERT_MESSAGE.PROFILE_NOT_FOUND,
      );
      return;
    }

    try {
      setLoading(true);
      const mealPlan = await generateMealPlan(userProfile);
      await saveMealPlan(mealPlan);

      // Show success toast and navigate to meal plan
      showSuccessToast(MessageConstants.SUCCESS.MEAL_PLAN_GENERATED);

      // Navigate to the meal plan screen
      navigation.navigate('MealPlan', { mealPlanId: mealPlan.id });
    } catch (error) {
      console.error(MessageConstants.ERROR.GENERATE_MEAL_PLAN_FAILED, error);
      showAlert(
        MessageConstants.ALERT_TITLE.ERROR,
        MessageConstants.ERROR.GENERATE_MEAL_PLAN_FAILED,
      );
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.GREEN_PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {MessageConstants.UI_TEXT.WELCOME_PREFIX}
            {userProfile.name}
          </Text>
          <Text style={styles.subtitle}>
            {MessageConstants.UI_TEXT.WELCOME_SUBTITLE}
          </Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>
            {MessageConstants.UI_TEXT.YOUR_PROFILE}
          </Text>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.AGE}
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.age} {MessageConstants.UI_TEXT.YEARS}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.WEIGHT}
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.weight} {MessageConstants.UI_TEXT.KG}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.DIET}:
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.dietaryPreference === 'vegetarian'
                ? MessageConstants.LABEL.VEGETARIAN
                : MessageConstants.LABEL.NON_VEGETARIAN}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.GENDER}
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.gender === 'male'
                ? MessageConstants.LABEL.MALE
                : userProfile.gender === 'female'
                ? MessageConstants.LABEL.FEMALE
                : MessageConstants.LABEL.OTHER}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.GOAL}
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.goal === 'weight-loss'
                ? MessageConstants.LABEL.LOSE_WEIGHT
                : userProfile.goal === 'weight-gain'
                ? MessageConstants.LABEL.GAIN_WEIGHT
                : MessageConstants.LABEL.MAINTAIN_WEIGHT}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>
              {MessageConstants.LABEL.PREFERRED_CUISINE}
            </Text>
            <Text style={styles.profileValue}>
              {userProfile.cuisineType === 'indian'
                ? MessageConstants.LABEL.INDIAN_CUISINE
                : userProfile.cuisineType === 'western'
                ? MessageConstants.LABEL.WESTERN_CUISINE
                : userProfile.cuisineType === 'mediterranean'
                ? MessageConstants.LABEL.MEDITERRANEAN_CUISINE
                : userProfile.cuisineType === 'asian'
                ? MessageConstants.LABEL.ASIAN_CUISINE
                : MessageConstants.LABEL.MIXED_CUISINE}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateMealPlan}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.TEXT_ON_DARK} />
          ) : (
            <Text style={styles.generateButtonText}>
              {MessageConstants.BUTTON.GENERATE_MEAL_PLAN}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.aiNote}>{MessageConstants.UI_TEXT.POWERED_BY}</Text>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        primaryButtonText="OK"
        onPrimaryPress={hideAlert}
        onDismiss={hideAlert}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
