import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '@utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingHorizontal: scale(20),
    },
    alertContainer: {
      width: '100%',
      maxWidth: scale(350),
      borderRadius: moderateScale(12),
      overflow: 'hidden',
      backgroundColor: colors.BACKGROUND_SURFACE,
    },
    headerContainer: {
      paddingHorizontal: scale(24),
      paddingTop: verticalScale(24),
      paddingBottom: verticalScale(16),
    },
    title: {
      fontSize: moderateScale(20),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
    },
    contentContainer: {
      paddingHorizontal: scale(24),
      paddingBottom: verticalScale(24),
    },
    message: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(24),
      fontWeight: '400',
      color: colors.TEXT_SECONDARY,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: scale(16),
      paddingBottom: verticalScale(16),
    },
    singleButtonContainer: {
      justifyContent: 'flex-end',
    },
    buttonSpacer: {
      flex: 1,
    },
    button: {
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: scale(80),
    },
    buttonText: {
      fontSize: moderateScale(16),
      fontWeight: '500',
    },
    primaryButton: {
      backgroundColor: colors.GREEN_PRIMARY,
    },
    primaryButtonText: {
      color: colors.TEXT_ON_DARK,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.BORDER,
    },
    secondaryButtonText: {
      color: colors.TEXT_SECONDARY,
    },
  });
