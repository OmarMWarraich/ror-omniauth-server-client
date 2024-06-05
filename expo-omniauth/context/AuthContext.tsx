import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { createContext, useContext, useEffect, useState } from "react";
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
const APP_ID = "0yYkiu1bdq3jGEmyWcbaoK2wfPx_rNWzHCkfDlj9Eao";
const TOKEN_KEY = "token";
const redirectUri = AuthSession.makeRedirectUri();

type AuthProps = {
  token: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: () => Promise<boolean>;
  initialized: boolean;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
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
      setToken(res);
      return true;
    }
    return false;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null) {
      const error = err as { message?: string };
      if (error.message === 'Network request failed') {
        console.error('Network error:', error);
      }
    }
    // Ensure a boolean is always returned
    return false;
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
      setToken(data.access_token);
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

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
      setInitialized(true);
    };
    loadToken();
  }, []);

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
    setToken(null);
  };

  const value = {
    initialized,
    login,
    logout,
    isLoggedIn,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
