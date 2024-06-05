import { useAuth } from '@/context/AuthContext';
import { View, Text, Button, Pressable } from 'react-native';
const Page = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Text>I AM INSIDE</Text>
      <Pressable onPress={logout}>Logout</Pressable>
    </View>
  );
};
export default Page;