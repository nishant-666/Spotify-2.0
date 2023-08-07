import React, { useEffect, useState } from "react";
import styles from "./Player.module.css";
import { getTracks } from "@/API/searchTrack";
import SpotifyPlayerComponent from "../SpotifyPlayer";

export default function Player() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState("");
  const [access_token, setAccessToken] = useState("");
  const getCurrentTrack = (currentTrackURI: string) => {
    setCurrentTrack(currentTrackURI);
  };

  const fetchTracks = async () => {
    if (searchInput) {
      let response = await getTracks(searchInput);
      console.log(response);
      setSearchResults(
        response.tracks.items.map(
          (track: {
            name: "";
            uri: "";
            album: {
              name: "";
              images: [
                {
                  url: "";
                },
                {
                  url: "";
                }
              ];
            };
          }) => {
            return {
              name: track.name,
              uri: track.uri,
              images: track.album.images[1].url,
              albumName: track.album.name,
            };
          }
        ) || {}
      );
    }
  };
  useEffect(() => {
    let debounced = setTimeout(() => {
      fetchTracks();
    }, 2000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    let token = sessionStorage.getItem("access_token");
    setAccessToken(token || "");
  }, []);

  return (
    <div className={styles.player}>
      <input
        type="text"
        placeholder="Search a Track.."
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        className={`input input-bordered w-full max-w-xs ${styles.input}`}
      />

      <div className={styles.grid}>
        {searchResults.map((track: { name: ""; images: ""; uri: "" }) => {
          return (
            <div
              className={styles.inner}
              onClick={() => getCurrentTrack(track.uri)}
            >
              <img className={styles.trackImage} src={track.images} />
              <p className={styles.trackName}>{track.name}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.spotifyPlayer}>
        <SpotifyPlayerComponent
          access_token={access_token}
          currentTrack={currentTrack}
        />
      </div>
    </div>
  );
}
