import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { authorize, getToken } from "@/API/authorize";
import useRefreshToken from "@/hooks/useRefreshToken";
import Player from "@/components/Player";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const code = router.query.code;
  useRefreshToken(code as string);
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {code ? (
          <>
            <Player />
          </>
        ) : (
          <button onClick={authorize} className="btn btn-accent">
            Authorize
          </button>
        )}
      </main>
    </>
  );
}
