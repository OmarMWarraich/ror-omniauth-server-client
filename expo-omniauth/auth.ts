import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { post, ENDPOINT } from "./network";

const APP_ID = "6Z6SkDBNNV3sYa-__ysrUHAfUFDOnB41LPBgOZ9Tg_8";
const TOKEN_KEY = "token";
export let token: string | null = null;

const discovery = AuthSession.useAutoDiscovery("http://localhost:3000");

// Check if the user is logged in
export const isLoggedIn = async () => {
  try {
    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    if (storedToken !== null) {
      token = storedToken;
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(`Error checking login status: ${error}`);
  }
};

// Log in the user
export const login = async () => {
  const redirectUri = AuthSession.makeRedirectUri({
    native: "myapp://redirect",
    useProxy: true,
  });

  const authUrl = `${ENDPOINT}/oauth/authorize?response_type=code&client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  const result = await AuthSession.startAsync({ authUrl });

  if (result.type === "success" && result.params?.code) {
    try {
      const response = await post("/oauth/token", {
        grant_type: "authorization_code",
        code: result.params.code,
        client_id: APP_ID,
        redirect_uri: redirectUri,
      });

      if (response.access_token) {
        await SecureStore.setItemAsync(TOKEN_KEY, response.access_token);
        token = response.access_token;
        return true;
      } else {
        throw new Error(`Token response error: ${response.error}`);
      }
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  } else {
    if ("params" in result) {
      throw new Error(
        `Authentication failed: ${result.params?.error || "Unknown error"}`
      );
    } else {
      throw new Error("Authentication failed: Unknown error");
    }
  }
};

// Log out the user
export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    token = null;
  } catch (error) {
    throw new Error(`Logout failed: ${error}`);
  }
};
