import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { ThemedStatusBar } from '@components/ThemedStatusBar/index';

import { NavigationParamsList } from '@/types';

import OnboardingScreen from '@screens/OnboardingScreen/index';
import HomeScreen from '@screens/HomeScreen/index';
import MealPlanScreen from '@screens/MealPlanScreen';
import ProfileEditScreen from '@screens/ProfileEditScreen/index';
import HistoryScreen from '@screens/HistoryScreen/index';
import SettingsScreen from '@screens/SettingsScreen/index';

import { useOnboarding } from '@contexts/OnboardingContext';
import { useTheme } from '@contexts/ThemeContext';
import { getThemeColors } from '@constants/ThemeColors';

import CustomIcon from '@components/CustomIcon/index';
import { moderateScale } from '@utils/scaling';
import { TAB_ICONS, TAB_LABELS } from '@constants/TabConstants';

const Stack = createNativeStackNavigator<NavigationParamsList>();
const Tab = createBottomTabNavigator<NavigationParamsList>();

function getTabIcon(iconName: string) {
  return function (props: { focused: boolean; color: string; size: number }) {
    return (
      <View style={{ marginBottom: moderateScale(4) }}>
        <CustomIcon name={iconName} color={props.color} size={props.size} />
      </View>
    );
  };
}

const MainTabs = () => {
  // Get theme and colors
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.GREEN_PRIMARY,
        tabBarInactiveTintColor: colors.TEXT_SECONDARY,
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          paddingBottom: moderateScale(4),
        },
        tabBarStyle: {
          paddingBottom: moderateScale(4),
          height: moderateScale(52),
          backgroundColor: colors.BACKGROUND_SURFACE,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: TAB_LABELS.HOME,
          tabBarIcon: getTabIcon(TAB_ICONS.HOME),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: TAB_LABELS.HISTORY,
          tabBarIcon: getTabIcon(TAB_ICONS.HISTORY),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: TAB_LABELS.SETTINGS,
          tabBarIcon: getTabIcon(TAB_ICONS.SETTINGS),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const { isOnboarded, loading } = useOnboarding();

  // Get theme and colors
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.BACKGROUND_MAIN,
        }}
      >
        <ActivityIndicator size="large" color={colors.GREEN_PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemedStatusBar />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboarded ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen
                name="MealPlan"
                component={MealPlanScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ProfileEdit"
                component={ProfileEditScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
