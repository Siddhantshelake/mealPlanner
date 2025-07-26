import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useNavigation,
  useIsFocused,
  NavigationProp,
} from '@react-navigation/native';
import {MealPlan} from '@/types';
import {getMealPlans} from '@utils/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@contexts/ThemeContext';
import {getThemeColors} from '@constants/ThemeColors';
import {createStyles} from './styles';
import {MessageConstants} from '@constants/MessageConstants';

type RootStackParamList = {
  MealPlan: {mealPlanId?: string};
  History: undefined;
  Home: undefined;
  Main: undefined;
};

const HistoryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const {theme} = useTheme();
  const colors = getThemeColors(theme);
  const isFocused = useIsFocused();
  const styles = createStyles(colors);

  useEffect(() => {
    if (isFocused) {
      loadMealPlans();
    }
  }, [isFocused]);

  const loadMealPlans = async () => {
    try {
      setLoading(true);
      const plans = await getMealPlans();
      setMealPlans(plans);
    } catch (error) {
      console.error(MessageConstants.ERROR.GENERIC, error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleMealPlanPress = (mealPlanId: string) => {
    navigation.navigate('MealPlan', {mealPlanId});
  };

  const renderMealPlanItem = ({item}: {item: MealPlan}) => {
    return (
      <TouchableOpacity
        style={styles.mealPlanCard}
        onPress={() => handleMealPlanPress(item.id)}>
        <View style={styles.mealPlanHeader}>
          <Text style={styles.mealPlanDate}>
            {formatDate(item.date)}
          </Text>
          <View style={styles.calorieContainer}>
            <Icon name="fire" size={16} style={styles.fireIcon} />
            <Text style={styles.calorieText}>
              {item.totalCalories} {MessageConstants.UI_TEXT.CALORIES_SUFFIX}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.mealsOverview}>
          <View style={styles.mealPreview}>
            <View style={[styles.mealDot, styles.breakfastDot]} />
            <Text style={styles.mealTitle} numberOfLines={1}>
              {item.breakfast.name}
            </Text>
          </View>

          <View style={styles.mealPreview}>
            <View style={[styles.mealDot, styles.lunchDot]} />
            <Text style={styles.mealTitle} numberOfLines={1}>
              {item.lunch.name}
            </Text>
          </View>

          <View style={styles.mealPreview}>
            <View style={[styles.mealDot, styles.dinnerDot]} />
            <Text style={styles.mealTitle} numberOfLines={1}>
              {item.dinner.name}
            </Text>
          </View>
        </View>

        <View style={styles.viewDetailsContainer}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.chevronIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.GREEN_PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{MessageConstants.LABEL.MEAL_PLAN_HISTORY}</Text>
      </View>

      {mealPlans.length > 0 ? (
        <FlatList
          data={mealPlans}
          renderItem={renderMealPlanItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="history" size={60} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>{MessageConstants.UI_TEXT.NO_MEAL_PLANS}</Text>
          <Text style={styles.emptySubtext}>
            {MessageConstants.UI_TEXT.GENERATE_INSTRUCTION}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;
