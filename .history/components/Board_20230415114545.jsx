import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const BOARD_SIZE = 10;

class Node {
  constructor(value) {
    this.value = value;
    this.next = None;
  }
}

export default function Board() {
  const [board, setBoard] = useState(
    new Array(BOARD_SIZE).fill(0).map((_) => new Array(BOARD_SIZE).fill(0))
  );
  return (
    <div className={styles.board}>
      {board.map((row, index) => (
        <div key={index} className={styles.row}>
          {row.map((_, index) => (
            <div
              key={index}
              className={`${styles.cell} ${
                false ? styles.snake_cell : styles.food_cell
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
