import SessionExpired from "@/components/context/SessionExpired";
import { GetAuthCookie } from "@/utils/token";
import React from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string) => {
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (exp !== undefined) {
      return exp < currentTime;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
};

const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  const token = GetAuthCookie();

  if (!token) {
    return <SessionExpired />;
  }

  if (isTokenExpired(token)) {
    return <SessionExpired />;
  }

  return children;
};

export default AuthContext;
