import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { createBoard } from "../utils";

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
  const [board, setBoard] = useState(createBoard(10));

  // A set to store the values of all snake cells
  const [snakeCells, setSnakeCells] = useState(new Set([44]));

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
