import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    scrollContent: {
      paddingHorizontal: scale(20),
      paddingBottom: verticalScale(20),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      marginTop: verticalScale(20),
      marginBottom: verticalScale(30),
    },
    title: {
      fontSize: moderateScale(28),
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY,
    },
    subtitle: {
      fontSize: moderateScale(16),
      color: colors.TEXT_SECONDARY,
      marginTop: verticalScale(5),
    },
    profileCard: {
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderRadius: moderateScale(15),
      padding: scale(20),
      marginBottom: verticalScale(30),
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    profileTitle: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.GREEN_PRIMARY,
      marginBottom: verticalScale(15),
    },
    profileItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: verticalScale(10),
      borderBottomWidth: 1,
      borderBottomColor: colors.DIVIDER_DEFAULT,
    },
    profileLabel: {
      fontSize: moderateScale(16),
      color: colors.TEXT_SECONDARY,
    },
    profileValue: {
      fontSize: moderateScale(16),
      color: colors.TEXT_PRIMARY,
      fontWeight: '500',
    },
    illustrationContainer: {
      alignItems: 'center',
      marginVertical: verticalScale(20),
    },
    illustration: {
      width: scale(150),
      height: scale(150),
    },
    generateButton: {
      backgroundColor: colors.GREEN_PRIMARY,
      borderRadius: moderateScale(15),
      paddingVertical: verticalScale(16),
      alignItems: 'center',
      marginTop: verticalScale(10),
    },
    generateButtonText: {
      color: colors.TEXT_ON_DARK,
      fontSize: moderateScale(18),
      fontWeight: '600',
    },
    aiNote: {
      textAlign: 'center',
      flexDirection: 'row',
      marginTop: verticalScale(20),
      color: colors.TEXT_TERTIARY,
      fontSize: moderateScale(14),
    },
  });
