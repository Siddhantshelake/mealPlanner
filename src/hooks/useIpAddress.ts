import {useState, useEffect} from 'react';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_STORAGE_KEY = '@ip_address';

const fetchPublicIp = async (): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip || null;
  } catch (error) {
    console.log('Failed to fetch public IP:', error);
    return null;
  }
};

export const getDeviceIpAddress = async (): Promise<string | null> => {
  try {
    // First try to get local IP
    const state = await NetInfo.fetch();
    let localIp: string | null = null;

    if (state?.type === NetInfoStateType.wifi) {
      localIp = state?.details?.ipAddress;
    }

    if (localIp) {
      return localIp;
    }

    // If no local IP, try to get public IP
    return await fetchPublicIp();
  } catch (error) {
    console.log('Failed to fetch IP address:', error);
    return null;
  }
};

export const useIpAddress = (): string | null => {
  const [ip, setIp] = useState<string | null>(null);

  // Load initial IP from storage
  useEffect(() => {
    const loadStoredIp = async () => {
      try {
        const storedIp = await AsyncStorage.getItem(IP_STORAGE_KEY);
        if (storedIp) {
          setIp(storedIp);
        }
      } catch (error) {
        console.log('Error loading stored IP:', error);
      }
    };

    loadStoredIp();
  }, []);

  // Handle IP updates and network changes
  useEffect(() => {
    // Update storage and state when IP changes
    const updateIp = async (newIp: string | null): Promise<void> => {
      if (newIp) {
        setIp(newIp);
        try {
          await AsyncStorage.setItem(IP_STORAGE_KEY, newIp);
        } catch (error) {
          console.log('Error saving IP:', error);
        }
      } else {
        setIp(null);
      }
    };

    const fetchAndSetIp = async (): Promise<void> => {
      try {
        // First try to get IP using the existing function
        const address = await getDeviceIpAddress();
        if (address) {
          updateIp(address);
          return;
        }

        // Fallback to public IP if local IP not available
        const publicIp = await fetchPublicIp();
        updateIp(publicIp || 'No IP / Offline');
      } catch (error) {
        console.log('Failed to fetch IP:', error);
        updateIp('No IP / Offline');
      }
    };

    const handleNetworkChange = (state: any) => {
      if (state.isConnected) {
        // For WiFi, try to get local IP first
        if (state.type === NetInfoStateType.wifi && state.details?.ipAddress) {
          updateIp(state.details.ipAddress);
          return;
        }
        // For other connection types or if no local IP, use the fetch function
        fetchAndSetIp();
      } else {
        updateIp('No IP / Offline');
      }
    };

    // Initial fetch
    NetInfo.fetch().then(handleNetworkChange);

    // Listen for network changes
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []); // No dependencies needed as we don't use any external values

  // Return the current IP
  return ip;
};
