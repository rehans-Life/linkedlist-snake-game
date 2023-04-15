import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const BOARD_SIZE = 10;

// A Class to represent each node of the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = None;
  }
}

// A class to represent the singly linked list
class SinglyLinkedList {
  constructor(value) {
    let node = new Node(value);
    this.head = node;
    this.tail = node;
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
