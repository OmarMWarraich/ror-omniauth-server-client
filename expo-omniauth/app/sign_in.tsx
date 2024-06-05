import React from 'react';
import { router } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';
import { useAuth } from "@/context/AuthContext";

const SignInScreen: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!login) return;
    try {
      await login();
      router.push('/(authenticated)/(tabs)/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
