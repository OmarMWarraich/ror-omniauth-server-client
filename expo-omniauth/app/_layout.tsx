import { Colors } from '@/constants/Colors';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const InitialLayout = () => {
  const { token, initialized } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(authenticated)';

    if (token && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    } else if (!token && inAuthGroup) {
      router.replace('/');
    }
  }, [token, initialized]);

  if (!initialized) return <ActivityIndicator size={'large'} style={{ flex: 1 }} />;

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="privacy"
          options={{
            presentation: 'modal',
            title: 'Privacy',
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />

        <Stack.Screen
          name="sign_in"
          options={{
            title: 'Sign In',
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}