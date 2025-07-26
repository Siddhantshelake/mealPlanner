import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    header: {
      padding: scale(20),
      paddingBottom: scale(10),
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      paddingHorizontal: scale(20),
      paddingBottom: verticalScale(30),
    },
    mealPlanCard: {
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderRadius: moderateScale(12),
      marginBottom: verticalScale(16),
      padding: scale(16),
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(3),
      elevation: 2,
    },
    mealPlanHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mealPlanDate: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
    },
    calorieContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.ERROR_RED_LIGHT,
      paddingVertical: verticalScale(4),
      paddingHorizontal: scale(8),
      borderRadius: moderateScale(20),
    },
    calorieText: {
      fontSize: moderateScale(14),
      fontWeight: '600',
      color: colors.ERROR_RED,
      marginLeft: scale(4),
    },
    divider: {
      height: 1,
      backgroundColor: colors.BORDER_DEFAULT,
      marginVertical: verticalScale(12),
    },
    mealsOverview: {
      marginBottom: verticalScale(10),
    },
    mealPreview: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(6),
    },
    mealDot: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(4),
      marginRight: scale(6),
    },
    mealTitle: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
    },
    viewDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 8,
    },
    viewDetailsText: {
      fontSize: moderateScale(14),
      color: colors.GREEN_PRIMARY,
      fontWeight: '600',
      marginRight: scale(4),
    },
    breakfastDot: {
      backgroundColor: colors.GREEN_PRIMARY,
    },
    lunchDot: {
      backgroundColor: colors.BLUE_ACCENT,
    },
    dinnerDot: {
      backgroundColor: colors.PURPLE_ACCENT,
    },
    fireIcon: {
      color: colors.ERROR_RED,
    },
    chevronIcon: {
      color: colors.GREEN_PRIMARY,
    },
    emptyIcon: {
      color: colors.TEXT_TERTIARY,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(20),
    },
    emptyText: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.TEXT_TERTIARY,
      marginTop: verticalScale(16),
    },
    emptySubtext: {
      fontSize: moderateScale(14),
      color: colors.TEXT_TERTIARY,
      textAlign: 'center',
      marginTop: verticalScale(8),
      lineHeight: verticalScale(20),
    },
  });
