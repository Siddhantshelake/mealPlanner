import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from '@utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    mealCard: {
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderRadius: moderateScale(12),
      marginBottom: verticalScale(20),
      overflow: 'hidden',
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(3),
      elevation: 2,
    },
    mealHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: scale(12),
    },
    mealHeaderText: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.TEXT_ON_DARK,
      marginLeft: scale(8),
      flex: 1,
    },
    mealHeaderCalories: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_ON_DARK,
    },
    headerIcon: {
      color: colors.TEXT_ON_DARK,
    },
    mealContent: {
      padding: scale(16),
    },
    mealName: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
      marginBottom: verticalScale(8),
    },
    mealDescription: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
      marginBottom: verticalScale(16),
      lineHeight: verticalScale(20),
    },
    ingredientsTitle: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
      marginBottom: verticalScale(8),
    },
    ingredientsList: {
      marginLeft: scale(4),
    },
    ingredientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(6),
    },
    ingredientText: {
      fontSize: moderateScale(14),
      color: colors.TEXT_PRIMARY,
      flex: 1,
    },

    breakfastHeader: {
      backgroundColor: colors.GREEN_PRIMARY,
    },
    lunchHeader: {
      backgroundColor: colors.BLUE_ACCENT,
    },
    dinnerHeader: {
      backgroundColor: colors.PURPLE_ACCENT,
    },

    breakfastIcon: {
      color: colors.GREEN_PRIMARY,
    },
    lunchIcon: {
      color: colors.BLUE_ACCENT,
    },
    dinnerIcon: {
      color: colors.PURPLE_ACCENT,
    },
  });
