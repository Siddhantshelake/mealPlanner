import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { createStyles } from './styles';
import { MessageConstants } from '@constants/MessageConstants';

interface MealCardProps {
  title: string;
  meal: {
    name: string;
    description: string;
    calories: number;
    items: string[];
  };
  type: 'breakfast' | 'lunch' | 'dinner';
  icon: string;
}

const MealCard = ({ title, meal, type, icon }: MealCardProps) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  return (
    <View style={styles.mealCard}>
      <View style={[styles.mealHeader, styles[`${type}Header`]]}>
        <Icon name={icon} size={24} style={styles.headerIcon} />
        <Text style={styles.mealHeaderText}>{title}</Text>
        <Text style={styles.mealHeaderCalories}>
          {meal.calories} {MessageConstants.UI_TEXT.CALORIES_SUFFIX}
        </Text>
      </View>

      <View style={styles.mealContent}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealDescription}>{meal.description}</Text>

        <Text style={styles.ingredientsTitle}>
          {MessageConstants.UI_TEXT.INGREDIENTS}
        </Text>
        <View style={styles.ingredientsList}>
          {meal.items.map((item, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Icon
                name="circle-small"
                size={18}
                style={styles[`${type}Icon`]}
              />
              <Text style={styles.ingredientText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MealCard;
