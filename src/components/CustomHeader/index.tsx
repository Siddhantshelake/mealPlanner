import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { scale, moderateScale, verticalScale } from '@utils/scaling';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.BACKGROUND_SURFACE }]}
    >
      {showBackButton && (
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.GREEN_LIGHT }]}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="arrow-left" size={22} color={colors.GREEN_PRIMARY} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      {/* Empty View for layout balance when back button is shown */}
      {showBackButton && <View style={styles.emptySpace} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: moderateScale(20),
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: moderateScale(18),
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySpace: {
    width: 40,
  },
});

export default CustomHeader;
