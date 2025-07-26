import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { MealPlan } from '@/types';
import { getMealPlanById } from '@utils/storage';
import MealCard from '@components/MealCard';
import CustomHeader from '@components/CustomHeader';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { MessageConstants } from '@constants/MessageConstants';
import { createStyles } from './styles';

type RootStackParamList = {
  MealPlan: { mealPlanId?: string };
  Home: undefined;
  Main: undefined;
};

const MealPlanScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MealPlan'>>();
  const { mealPlanId } = route.params;

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  const loadMealPlan = useCallback(async () => {
    try {
      const plan = await getMealPlanById(mealPlanId || '');
      setMealPlan(plan);
    } catch (error) {
      console.error(MessageConstants.ERROR.MEAL_PLAN_LOAD_FAILED, error);
    } finally {
      setLoading(false);
    }
  }, [mealPlanId]);

  useEffect(() => {
    if (mealPlanId) {
      loadMealPlan();
    } else {
      setLoading(false);
    }
  }, [mealPlanId, loadMealPlan]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.GREEN_PRIMARY} />
      </View>
    );
  }

  if (!mealPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {MessageConstants.ERROR.MEAL_PLAN_NOT_FOUND}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
            {MessageConstants.BUTTON.GO_BACK}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <CustomHeader title="Meal Plan" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.date}>{formatDate(mealPlan.date)}</Text>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieLabel}>
              {MessageConstants.LABEL.TOTAL_CALORIES}:
            </Text>
            <Text style={styles.calorieValue}>
              {mealPlan.totalCalories}{' '}
              {MessageConstants.UI_TEXT.CALORIES_SUFFIX}
            </Text>
          </View>
        </View>

        <MealCard
          title={MessageConstants.LABEL.BREAKFAST}
          meal={mealPlan.breakfast}
          type="breakfast"
          icon="coffee"
        />

        <MealCard
          title={MessageConstants.LABEL.LUNCH}
          meal={mealPlan.lunch}
          type="lunch"
          icon="food"
        />

        <MealCard
          title={MessageConstants.LABEL.DINNER}
          meal={mealPlan.dinner}
          type="dinner"
          icon="food-variant"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealPlanScreen;
