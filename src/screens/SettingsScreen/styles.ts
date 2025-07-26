import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from '@utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    scrollContent: {
      paddingHorizontal: scale(4),
      paddingBottom: verticalScale(16),
    },
    header: {
      padding: scale(20),
      paddingBottom: verticalScale(10),
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY,
    },
    settingsList: {
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderRadius: moderateScale(15),
      marginHorizontal: scale(20),
      marginTop: verticalScale(10),
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(3),
      elevation: 2,
      paddingVertical: verticalScale(10),
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: verticalScale(16),
      paddingHorizontal: scale(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.BORDER_DEFAULT,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingText: {
      fontSize: moderateScale(16),
      color: colors.TEXT_PRIMARY,
      marginLeft: scale(12),
      flex: 1,
    },
    versionText: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
    },
    resetButton: {
      backgroundColor: colors.ERROR_RED,
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(20),
      borderRadius: moderateScale(10),
      marginHorizontal: scale(20),
      marginTop: verticalScale(30),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resetButtonText: {
      color: '#FFFFFF',
      fontSize: moderateScale(16),
      fontWeight: '600',
      marginLeft: scale(8),
    },
    disclaimer: {
      fontSize: moderateScale(12),
      color: colors.TEXT_SECONDARY,
      marginTop: verticalScale(10),
      textAlign: 'center',
      marginHorizontal: scale(20),
    },
    footer: {
      position: 'absolute',
      bottom: verticalScale(20),
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    footerText: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
    },
  });
