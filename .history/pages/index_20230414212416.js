import Head from "next/head";
import styles from "../styles/Home.module.css";
import Board from "../components/Board";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Linked List Snake Game</title>
        <meta name="description" content="linked list snake game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Board />
    </div>
  );
}
