import { StyleSheet } from 'react-native';
import { moderateScale } from '@utils/scaling';
import { getThemeColors, Colors } from '@constants/ThemeColors';

type ThemeColors = ReturnType<typeof getThemeColors>;

export const createStyles = (
  colors: ThemeColors,
  currentTheme: string = 'light',
) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: moderateScale(50),
      left: moderateScale(20),
      right: moderateScale(20),
      backgroundColor:
        currentTheme === 'dark'
          ? Colors.light.BACKGROUND_CARD
          : Colors.dark.BACKGROUND_CARD,
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.3,
      shadowRadius: moderateScale(3),
      elevation: 4,
    },
    message: {
      color:
        currentTheme === 'dark'
          ? Colors.light.TEXT_PRIMARY
          : Colors.light.TEXT_ON_DARK,
      fontSize: moderateScale(14),
      textAlign: 'center',
      fontWeight: '500',
    },
  });
};
