// Функции для работы с токенами
import { jwtDecode } from "jwt-decode";

export const setToken = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);

    const decoded = decodeToken(accessToken);
    if (decoded?.sub) {
      sessionStorage.setItem("userId", decoded.sub);
    }

    if (decoded?.role) {
      // Assuming the 'role' is in the decoded token
      sessionStorage.setItem("role", decoded.role);
    }
  }
};

export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const getUserId = () => sessionStorage.getItem("userId");
export const getRole = () => sessionStorage.getItem("role"); // Function to get the role

export const removeTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("role"); // Remove role as well
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded && decoded.exp * 1000 > Date.now();
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Błąd dekodowania tokenа:", error);
    return null;
  }
};
