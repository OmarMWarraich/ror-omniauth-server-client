import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

type AuthResultType = {
  type: "error" | "success";
  errorCode: string | null;
  error?: AuthSession.AuthError | null;
  params: Record<string, string>;
  authentication: AuthSession.TokenResponse | null;
  url: string;
};

WebBrowser.maybeCompleteAuthSession();

const ENDPOINT = "http://localhost:5000";
const APP_ID =
  "d1fd38bf45771da9a602ed9762bf2d9c4004053b6c380b76322fc12a58a08442";
const TOKEN_KEY = "token";
export var token: string | null;

const redirectUri = AuthSession.makeRedirectUri();

export const useAuth = () => {
  const [authResult, setAuthResult] = useState<AuthResultType | null>(null);

  const discovery = AuthSession.useAutoDiscovery(`${ENDPOINT}/oauth/authorize`);
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: APP_ID,
      responseType: "code",
      scopes: ["read"],
    },
    discovery
  );

  const isLoggedIn = async () => {
    try {
      const res = await SecureStore.getItemAsync(TOKEN_KEY);
      if (res !== null) {
        token = res;
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        setAuthResult(result);
      }
    }
  }, [result]);

  const getAccessToken = async (code: any) => {
    try {
      const response = await fetch(`${ENDPOINT}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${APP_ID}&code_verifier=${
          request ? request.codeVerifier : ""
        }`,
      });
      const data = await response.json();
      await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
      token = data.access_token;
      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (authResult && authResult.params && authResult.params.code) {
      getAccessToken(authResult.params.code);
    }
  }, [authResult]);

  const login = async () => {
    const promptResult = await promptAsync();
    if (
      promptResult.type === "success" &&
      promptResult.params &&
      promptResult.params.code
    ) {
      await getAccessToken(promptResult.params.code);
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    token = null;
  };

  return { login, logout, isLoggedIn };
};
