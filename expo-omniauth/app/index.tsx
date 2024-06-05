import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const AuthLoadingScreen: React.FC= () => {
    const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    const handleLogin = async () => {
      const loggedIn = isLoggedIn ? await isLoggedIn() : false;
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      router.push(loggedIn ? '/(authenticated)/(tabs)/profile' : '/sign_in');
    };

    handleLogin();
  }, [isLoggedIn, router]);

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
