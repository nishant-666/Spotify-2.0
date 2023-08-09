import Head from "next/head";
import styles from "@/styles/Home.module.css";
import HomeComponent from "@/components/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeComponent />
      </main>
    </>
  );
}
