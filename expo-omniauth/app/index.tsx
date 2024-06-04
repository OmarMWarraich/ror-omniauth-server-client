import { Link } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/auth";

const Page = () => {
  const { isLoggedIn } = useAuth();
  const checkAuth = async () => {
    const res = await isLoggedIn();
    console.log(res);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <View>
      <Text>There will be dragons</Text>
      <Link href={"/auth"} asChild>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>Open auth</Text>
          <Ionicons name="arrow-forward" size={18} />
        </TouchableOpacity>
      </Link>

      <Link href={"/home"} asChild>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>Open home</Text>
          <Ionicons name="arrow-forward" size={18} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};
export default Page;
