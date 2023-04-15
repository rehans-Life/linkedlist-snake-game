import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { createBoard } from "../utils";

const BOARD_SIZE = 10;

// A Class to represent each node of the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
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
  const [board, setBoard] = useState(createBoard(40));

  // A set to store the values of all snake cells intially our snake will be of size
  // one cell and start from the 44th cells
  const [snakeCells, setSnakeCells] = useState(new Set([44]));

  // A linked list for our snake initally going to have only one node which
  // is at cell 44
  const [linkedlist, setLinkedList] = useState(new SinglyLinkedList(44));

  return (
    <div className={styles.board}>
      {board.map((row, index) => (
        <div key={index} className={styles.row}>
          {row.map((value, index) => (
            <div
              key={index}
              className={`${styles.cell} ${
                snakeCells.has(value) ? styles.snake_cell : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
