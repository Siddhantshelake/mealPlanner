import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  ScrollView,
} from 'react-native';
import CustomAlert from '@components/CustomAlert';
import { useShowToast } from '@components/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '@contexts/OnboardingContext';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavigationParamsList } from '@/types';
import { MessageConstants } from '@constants/MessageConstants';
import { moderateScale } from '@utils/scaling';
import { createStyles } from './styles';

import CustomIcon from '@components/CustomIcon';

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationParamsList>>();
  const { setIsOnboarded } = useOnboarding();
  const {
    theme,
    isDarkMode,
    toggleTheme,
    followSystemTheme,
    setFollowSystemTheme,
  } = useTheme();
  const [loading, setLoading] = useState(false);
  
  // Get toast functionality through hook
  const { showSuccessToast } = useShowToast();

  // Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  // Helper to show alerts
  const showAlert = (
    title: string,
    message: string,
    showConfirm = false,
    confirmFn?: () => void,
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
    setShowConfirmButton(showConfirm);
    if (confirmFn) {
      setConfirmAction(() => confirmFn);
    }
  };

  // Hide alert
  const hideAlert = () => {
    setAlertVisible(false);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    setAlertVisible(false);
    confirmAction();
  };

  // Show success toast using the hook
  const handleShowSuccessToast = (message: string) => {
    showSuccessToast(message);
  };

  const handleResetApp = () => {
    showAlert(
      MessageConstants.ALERT_TITLE.CONFIRM,
      MessageConstants.ALERT_MESSAGE.RESET_APP,
      true,
      async () => {
        try {
          setLoading(true);
          setIsOnboarded(false);
        } catch (error) {
          console.error(MessageConstants.ERROR.RESET_FAILED, error);
          showAlert(
            MessageConstants.ALERT_TITLE.ERROR,
            MessageConstants.ALERT_MESSAGE.RESET_FAILED,
          );
          setLoading(false);
        }
      },
    );
  };

  const handleVersionPress = () => {
    showAlert(
      MessageConstants.ALERT_TITLE.VERSION,
      MessageConstants.ALERT_MESSAGE.APP_VERSION,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{MessageConstants.LABEL.SETTINGS}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsList}>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <CustomIcon
                name="theme-light-dark"
                size={moderateScale(24)}
                color={colors.TEXT_SECONDARY}
              />
              <Text style={styles.settingText}>
                {MessageConstants.LABEL.DARK_MODE}
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={() => {
                  toggleTheme();
                  handleShowSuccessToast('Theme preference updated');
                }}
                disabled={followSystemTheme}
                trackColor={{
                  false: colors.BORDER_DEFAULT,
                  true: colors.GREEN_LIGHT,
                }}
                thumbColor={isDarkMode ? colors.GREEN_PRIMARY : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <CustomIcon
                name="cellphone-cog"
                size={moderateScale(24)}
                color={colors.TEXT_SECONDARY}
              />
              <Text style={styles.settingText}>
                {MessageConstants.LABEL.FOLLOW_SYSTEM_THEME}
              </Text>
              <Switch
                value={followSystemTheme}
                onValueChange={value => {
                  setFollowSystemTheme(value);
                  handleShowSuccessToast('System theme preference updated');
                }}
                trackColor={{
                  false: colors.BORDER_DEFAULT,
                  true: colors.GREEN_LIGHT,
                }}
                thumbColor={
                  followSystemTheme ? colors.GREEN_PRIMARY : '#f4f3f4'
                }
              />
            </View>
          </View>

          <View style={styles.settingItem}>
            <TouchableOpacity
              style={styles.settingContent}
              onPress={() => navigation.navigate('ProfileEdit')}
            >
              <CustomIcon
                name="account-edit"
                size={moderateScale(24)}
                color={colors.TEXT_SECONDARY}
              />
              <Text style={styles.settingText}>Edit Profile</Text>
              <CustomIcon
                name="chevron-right"
                size={moderateScale(24)}
                color={colors.TEXT_TERTIARY}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <TouchableOpacity
              style={styles.settingContent}
              onPress={handleVersionPress}
            >
              <CustomIcon
                name="information-outline"
                size={moderateScale(24)}
                color={colors.TEXT_SECONDARY}
              />
              <Text style={styles.settingText}>
                {MessageConstants.LABEL.APP_VERSION}
              </Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetApp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <CustomIcon
                  name="restore"
                  size={moderateScale(20)}
                  color="#ffffff"
                />
                <Text style={styles.resetButtonText}>
                  {MessageConstants.LABEL.RESET_APP}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            {MessageConstants.UI_TEXT.RESET_DISCLAIMER}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {MessageConstants.UI_TEXT.APP_FOOTER}
        </Text>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        primaryButtonText={
          showConfirmButton ? MessageConstants.BUTTON.CONFIRM : 'OK'
        }
        secondaryButtonText={
          showConfirmButton ? MessageConstants.BUTTON.CANCEL : undefined
        }
        onPrimaryPress={showConfirmButton ? handleConfirm : hideAlert}
        onSecondaryPress={hideAlert}
        onDismiss={hideAlert}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
