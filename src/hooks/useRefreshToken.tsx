import { useEffect, useState } from "react";

import { getToken, refreshSpotifyToken } from "@/API/authorize";

export default function useRefreshToken(code: string) {
  const [expiresIn, setExpiresIn] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const fetchToken = async () => {
    let response = await getToken(code);
    setRefreshToken(response.refresh_token);
    setAccessToken(response.access_token);
    setExpiresIn(response.expires_in);
    sessionStorage.setItem("access_token", response.access_token);
  };

  const refreshTokenFn = async () => {
    let response = await refreshSpotifyToken(refreshToken);
    setAccessToken(response.access_token);
    setExpiresIn(response.expires_in);
    sessionStorage.setItem("access_token", response.access_token);
  };

  useEffect(() => {
    fetchToken();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      refreshTokenFn();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
}
