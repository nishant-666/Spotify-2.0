const SPOTIFY_CLIENT_ID: string = `0063f86f7a194a6398730fe707b0965b`;
const client_secret: string = "b8e1c43827a848188fd9b6e1936449da";
const redirectUri: string = "http://localhost:3000";

export function generateRandomString(length: number): string {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const authorize = async () => {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state";

  let body = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  try {
    window.location.href = "https://accounts.spotify.com/authorize?" + body;
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (code: string) => {
  let body = new URLSearchParams({
    code: code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  try {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${client_secret}`).toString(
            "base64"
          ),
      },
      body: body,
    });
    // window.history.pushState({}, "", "/");
    return response.json();
  } catch (error) {
    window.location.href = "/";
  }
};

export const refreshSpotifyToken = async (refresh_token: string) => {
  let body = new URLSearchParams({
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  });

  try {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${client_secret}`).toString(
            "base64"
          ),
      },
      body: body,
    });

    return response.json();
  } catch (error) {
    window.location.href = "/";
  }
};
