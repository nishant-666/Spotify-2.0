import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAlbumTrack } from "@/API/APIs";
import styles from "@/styles/Album.module.css";
import SpotifyPlayerComponent from "@/components/SpotifyPlayer";
import { authorize, getToken } from "@/API/authorize";
import { convertMsToMinutesSeconds } from "@/helpers/timeConvert";

export default function Albums() {
  const [albumsTrack, setAlbumTrack] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [access_token, setAccessToken] = useState("");
  const [currentTrack, setCurrentTrack] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  const router = useRouter();

  const authorizeApp = async () => {
    await authorize();
  };

  const fetchArtistTrack = async () => {
    let response = await getAlbumTrack(router.query.id);
    setAlbumTrack(response.items);
  };

  const getCurrentTrack = (currentTrackURI: string) => {
    setCurrentTrack(currentTrackURI);
    setIsPlaying(true);
  };
  useEffect(() => {
    let token = sessionStorage.getItem("access_token");
    setAccessToken(token || "");
    fetchArtistTrack();
    setCodeVerifier(sessionStorage.getItem("code_verifier") || "");
  }, []);

  console.log(albumsTrack);
  return (
    <div className={styles.artistsMain}>
      <div className={styles.refreshBtn}>
        <button onClick={authorizeApp} className="btn btn-accent">
          Refresh Token
        </button>
      </div>
      <div>
        <p className={styles.artistHeader}>Album Tracks</p>
        <div className={styles.artistList}>
          <div>
            {albumsTrack?.map(
              (
                album: {
                  name: "";
                  id: "";
                  uri: "";
                  duration_ms: "";
                  album: {
                    images: [{ url: "" }, { url: "" }];
                  };
                },
                index
              ) => {
                return (
                  <div
                    className={`${styles.album} ${
                      currentTrack === album.uri ? styles.activeTrack : ""
                    }`}
                    onClick={() => getCurrentTrack(album.uri)}
                  >
                    <div>
                      <p className={styles.artistName}>
                        {" "}
                        <span>{index + 1}. </span> {album.name}
                      </p>
                      <p>Track</p>
                    </div>
                    <p>
                      {convertMsToMinutesSeconds(Number(album.duration_ms))}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {albumsTrack.length ? (
        <div className={styles.spotifyPlayer}>
          <SpotifyPlayerComponent
            playing={isPlaying}
            access_token={access_token}
            currentTrack={currentTrack}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
