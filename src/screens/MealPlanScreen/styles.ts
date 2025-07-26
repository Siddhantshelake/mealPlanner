import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    scrollContent: {
      padding: scale(16),
      paddingBottom: verticalScale(30),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: moderateScale(18),
      color: colors.ERROR_RED,
      marginBottom: verticalScale(20),
    },
    backButton: {
      backgroundColor: colors.GREEN_PRIMARY,
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(20),
      borderRadius: moderateScale(8),
    },
    backButtonText: {
      color: colors.TEXT_ON_DARK,
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
    header: {
      marginBottom: verticalScale(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_SECONDARY,
    },
    calorieContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    calorieLabel: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
      marginRight: scale(5),
    },
    calorieValue: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: colors.GREEN_PRIMARY,
    },
  });
