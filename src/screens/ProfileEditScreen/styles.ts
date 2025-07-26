import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '@utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    content: {
      flex: 1,
      padding: scale(16),
    },
    scrollContentContainer: {
      paddingBottom: verticalScale(30),
    },
    section: {
      marginBottom: verticalScale(24),
      backgroundColor: colors.BACKGROUND_SURFACE,
      borderRadius: moderateScale(12),
      padding: scale(16),
      shadowColor: colors.SHADOW_COLOR,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.TEXT_PRIMARY,
      marginBottom: verticalScale(16),
    },
    inputContainer: {
      marginBottom: verticalScale(16),
    },
    label: {
      fontSize: moderateScale(14),
      color: colors.TEXT_SECONDARY,
      marginBottom: verticalScale(6),
    },
    input: {
      height: verticalScale(48),
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
      borderRadius: moderateScale(8),
      paddingHorizontal: scale(12),
      fontSize: moderateScale(16),
      color: colors.TEXT_PRIMARY,
      backgroundColor: colors.BACKGROUND_SURFACE,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
      borderRadius: moderateScale(8),
      overflow: 'hidden',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: verticalScale(8),
    },
    option: {
      width: '48%',
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(8),
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
    },
    optionText: {
      fontSize: moderateScale(15),
      color: colors.TEXT_PRIMARY,
    },
    optionTextSelected: {
      color: colors.GREEN_PRIMARY,
      fontWeight: '600',
    },
    saveButton: {
      backgroundColor: colors.GREEN_PRIMARY,
      paddingVertical: verticalScale(14),
      borderRadius: moderateScale(10),
      alignItems: 'center',
      marginTop: verticalScale(16),
    },
    saveButtonText: {
      color: colors.TEXT_ON_DARK,
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
    fullWidth: {
      width: '100%',
    },
    loadingText: {
      fontSize: moderateScale(16),
      color: colors.TEXT_SECONDARY,
      textAlign: 'center',
    },
  });
