import React from "react";
import styles from "./Artists.module.css";
import { useRouter } from "next/router";

export default function Artists({ artists }: ArtistInterface) {
  const router = useRouter();
  return (
    <div className={styles.artistsMain}>
      <div>
        <p className={styles.artistHeader}>Artists</p>
        <div className={styles.artistList}>
          {artists?.map(
            (artist: {
              name: "";
              id: "";
              images: [{ url: "" }, { url: "" }];
            }) => {
              return (
                <div
                  className={styles.artist}
                  onClick={() => router.push(`/Artists?id=${artist.id}`)}
                >
                  <img
                    className={styles.artistImage}
                    src={
                      artist.images[1]?.url
                        ? artist.images[1]?.url
                        : "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                    }
                  />
                  <p className={styles.artistName}>
                    {artist.name.substring(0, 20)}
                  </p>
                  <p>Artist</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
