import { Colors } from "@/constants/Colors";
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.dark.background,
        },
        headerTintColor: '#fff',
        drawerActiveBackgroundColor: Colors.light.background,
        drawerActiveTintColor: '#fff',
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Drawer>
  );
};
export default DrawerLayout;