import { jwtDecode } from "jwt-decode";

export const setToken = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);

    const decoded = decodeToken(accessToken);
    if (decoded?.sub) {
      sessionStorage.setItem("userId", decoded.sub);
    }

    if (decoded?.role) {
      sessionStorage.setItem("role", decoded.role);
    }
  }
};

export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const getUserId = () => sessionStorage.getItem("userId");
export const getRole = () => sessionStorage.getItem("role");

export const removeTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("role");
};

export const isAuthenticated = () => {
  const userId = getUserId();
  const role = getRole();
  return Boolean(userId && role);
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Błąd dekodowania tokenа:", error);
    return null;
  }
};
