import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
      padding: 20,
    },
    keyboardAvoid: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.TEXT_PRIMARY,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: moderateScale(16),
      textAlign: 'center',
      color: colors.TEXT_TERTIARY,
      marginBottom: verticalScale(40),
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 40,
    },
    progressDot: {
      width: scale(12),
      height: scale(12),
      borderRadius: scale(6),
      backgroundColor: colors.DIVIDER_DEFAULT,
      marginHorizontal: scale(4),
    },
    progressDotActive: {
      backgroundColor: colors.GREEN_PRIMARY,
      transform: [{ scale: 1.2 }],
    },
    progressDotCompleted: {
      backgroundColor: colors.GREEN_LIGHT,
    },
    stepContainer: {
      marginBottom: verticalScale(30),
    },
    stepTitle: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY,
      marginBottom: verticalScale(30),
      textAlign: 'center',
    },
    input: {
      height: verticalScale(50),
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
      borderRadius: moderateScale(8),
      paddingHorizontal: scale(10),
      marginBottom: verticalScale(20),
      fontSize: moderateScale(16),
      color: colors.TEXT_PRIMARY,
      backgroundColor: colors.BACKGROUND_SURFACE,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: moderateScale(20),
    },
    option: {
      width: '48%',
      paddingVertical: verticalScale(15),
      paddingHorizontal: scale(10),
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
      borderRadius: moderateScale(8),
      marginBottom: verticalScale(10),
      alignItems: 'center',
    },
    optionSelected: {
      backgroundColor: colors.GREEN_LIGHT,
      borderColor: colors.GREEN_PRIMARY,
      borderWidth: 1,
    },
    optionText: {
      fontSize: moderateScale(16),
      color: colors.TEXT_PRIMARY,
      fontWeight: '500',
    },
    optionTextSelected: {
      color: colors.GREEN_PRIMARY,
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    backButton: {
      flex: 1,
      paddingVertical: verticalScale(15),
      marginRight: scale(10),
      borderRadius: moderateScale(10),
      backgroundColor: colors.BACKGROUND_SURFACE,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
    },
    backButtonText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
    },
    nextButton: {
      flex: 2,
      paddingVertical: verticalScale(15),
      borderRadius: moderateScale(10),
      backgroundColor: colors.GREEN_PRIMARY,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextButtonText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.TEXT_ON_DARK,
    },
  });
