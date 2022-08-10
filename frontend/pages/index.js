import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";

const styles = {
  container: `h-full w-full bg-[#fff]`,
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Momentix - Tickets That Become Memories</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* Navbar */}
      <Header />
      {/* Main */}
      <Main />
    </div>
  );
}
