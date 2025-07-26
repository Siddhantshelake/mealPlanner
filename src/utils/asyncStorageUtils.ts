import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getValueFromAsyncStorage(
  key: string,
): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting value for ${key}:`, error);
    return null;
  }
}

export async function setValueInAsyncStorage(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting value for ${key}:`, error);
    return false;
  }
}

export async function getJsonFromAsyncStorage<T>(
  key: string,
): Promise<T | null> {
  const value = await getValueFromAsyncStorage(key);
  return value ? JSON.parse(value) : null;
}

export async function setJsonInAsyncStorage<T>(
  key: string,
  value: T,
): Promise<boolean> {
  return setValueInAsyncStorage(key, JSON.stringify(value));
}
