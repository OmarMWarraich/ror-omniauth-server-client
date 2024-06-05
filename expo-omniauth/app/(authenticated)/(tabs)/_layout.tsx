import {Colors} from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';

const Layout = () => {
  const { logout } = useAuth();

  return (
    <>
      <StatusBar style="light" />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.tint,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <Pressable onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </Pressable>
          ),
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}>
        
        <Tabs.Screen
          name="profile"
          options={{
            title: 'My Profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="links"
          options={{
            title: 'Links',
            tabBarLabel: 'Links',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="link-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};
export default Layout;