import React, { useEffect, useState } from "react";
import styles from "./Player.module.css";
import { getTracks } from "@/API/APIs";
import SpotifyPlayerComponent from "../SpotifyPlayer";
import Artists from "../Artists";
import Albums from "../Albums";

export default function Player() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  // const [artists, setArtists] = useState([]);
  // const [albums, setAlbums] = useState([]);
  const [topTrack, setTopTrack] = useState({
    uri: "",
    trackName: "",
    trackImage: "",
    artistName: "",
  });
  const getCurrentTrack = (currentTrackURI: string) => {
    setCurrentTrack(currentTrackURI);
    setIsPlaying(true);
  };

  const fetchTracks = async () => {
    if (searchInput) {
      let response = await getTracks(searchInput);

      // setArtists(response.artists.items);
      // setAlbums(response.albums.items);
      setTopTrack({
        uri: response.tracks.items[0].uri,
        trackName: response.tracks.items[0].name,
        trackImage: response.tracks.items[0].album.images[1].url,
        artistName: response.tracks.items[0].artists[0].name,
      });

      setSearchResults(
        response.tracks.items.map(
          (track: {
            name: "";
            uri: "";
            artists: [
              {
                name: "";
              }
            ];
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
              artist: track.artists[0].name,
            };
          }
        ) || {}
      );
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchInput("");
    setCurrentTrack("");
    setIsPlaying(false);
    // setArtists([]);
    // setAlbums([]);
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
      <div className={styles.header}>
        <input
          type="text"
          placeholder="What do you want to Listen to?"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          className={`input input-bordered w-full max-w-xs ${styles.input}`}
        />
        <button onClick={clearSearch} className="btn btn-accent">
          Clear
        </button>
      </div>
      <div className={styles.resultList}>
        {searchResults.length ? (
          <div className={styles.topresults}>
            <p className={styles.topheader}>Top Result</p>
            <div
              className={styles.inner}
              onClick={() => getCurrentTrack(topTrack.uri)}
            >
              <img className={styles.toptrackImage} src={topTrack.trackImage} />
              <p className={styles.toptrackName}>{topTrack.trackName}</p>
              <p className={styles.topArtistName}>{topTrack.artistName}</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        {searchResults.length ? (
          <div>
            <p className={styles.songHeader}>Songs</p>
            {searchResults.length ? (
              searchResults.map(
                (track: {
                  name: "";
                  images: "";
                  uri: "";
                  artists: "";
                  artist: "";
                }) => {
                  return (
                    <div
                      className={styles.songList}
                      onClick={() => getCurrentTrack(track.uri)}
                    >
                      <img className={styles.trackImage} src={track.images} />
                      <div>
                        <p className={styles.trackName}>
                          {track.name.length > 15
                            ? `${track.name.substring(0, 15)}..`
                            : track.name}
                        </p>
                        <p className={styles.trackArtist}>
                          {track.artist || ""}
                        </p>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* {artists.length ? <Artists artists={artists} /> : <></>}
      {albums.length ? <Albums albums={albums} /> : <></>} */}
      {searchResults.length && isPlaying ? (
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
