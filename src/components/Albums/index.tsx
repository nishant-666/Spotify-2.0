import React from "react";
import styles from "./Albums.module.css";
import { useRouter } from "next/router";

export default function Albums({ albums }: AlbumsInterface) {
  const router = useRouter();
  return (
    <div className={styles.albumsMain}>
      <div>
        <p className={styles.albumHeader}>Albums</p>
        <div className={styles.albumList}>
          {albums?.map(
            (album: {
              id: "";
              name: "";
              images: [{ url: "" }, { url: "" }];
            }) => {
              return (
                <div
                  className={styles.album}
                  onClick={() => router.push(`/Albums?id=${album.id}`)}
                >
                  <img
                    className={styles.albumImage}
                    src={
                      album.images[1]?.url
                        ? album.images[1]?.url
                        : "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                    }
                  />
                  <p className={styles.albumName}>
                    {album.name.substring(0, 20)}
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
