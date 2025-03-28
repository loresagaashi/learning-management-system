import { useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { UserService } from "../service/UserService";

const userService = new UserService();
const refreshToken = async () => {
  const user = localStorage.getItem('user');
  if (user) {
    const refreshToken = JSON.parse(user).refreshToken;
    try {
      const response = await userService.refreshToken({ refreshToken });
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Failed to refresh token', error);
      localStorage.removeItem("user");
    }
  } else {
    localStorage.removeItem("user");
  }
};

export default function useUser() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const initializeUser = async () => {
      const userInLocalStorage = localStorage.getItem('user');
      if (userInLocalStorage && !user) {
        setUser(JSON.parse(userInLocalStorage));
      }

      // Refresh the access token if user is present
      if (userInLocalStorage) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          setUser(newAccessToken);
        }
      }
    };

    initializeUser();
  }, [setUser]);

  return { user, setUser };
}