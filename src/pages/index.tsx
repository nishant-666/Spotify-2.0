import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { authorize, getToken } from "@/API/authorize";
import Player from "@/components/Player";

export default function Home() {
  const [codeVerifier, setCodeVerifier] = useState("");

  useEffect(() => {
    setCodeVerifier(sessionStorage.getItem("code_verifier") || "");
    let token = sessionStorage.getItem("access_token");
    if (!token) {
      getToken();
    }
  }, []);

  const authorizeApp = async () => {
    await authorize();
  };

  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {codeVerifier ? (
          <>
            <Player />
          </>
        ) : (
          <button onClick={authorizeApp} className="btn btn-accent">
            Authorize
          </button>
        )}
      </main>
    </>
  );
}
