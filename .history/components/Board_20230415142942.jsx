import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { createBoard } from "../utils";

const BOARD_SIZE = 10;

// A Class to represent each node of the linked list
class Node {
  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.next = null;
  }
}

// A class to represent the singly linked list
class SinglyLinkedList {
  constructor(head) {
    let node = new Node(head.value, head.row, head.col);
    this.head = node;
    this.tail = node;
  }
}

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

export default function Board() {
  const [board, setBoard] = useState(createBoard(15));

  // A set to store the values of all snake cells intially our snake will be of size
  // one cell and start from the 44th cells
  const [snakeCells, setSnakeCells] = useState(new Set([80]));

  // A linked list for our snake initally going to have only one node which
  // is at cell 44
  const [linkedlist, setLinkedList] = useState(
    new SinglyLinkedList({ value: 80, row: 5, col: 4 })
  );

  const [direction, setDirection] = useState(Direction.RIGHT);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeyDown(e.key);
    });
    let gameStartInternal = setInterval(() => {
      setSnakeCells((currSnakeCells) => moveSnakeCells(currSnakeCells));
      setLinkedList((currLinkedList) => moveLinkedList(currLinkedList));
    }, 1000);
    return () => {
      clearInterval(gameStartInternal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(key) {
    const direction = getDirectionFromKey(key);
    if (direction === "") return;
    setDirection(direction);
  }

  const getDirectionFromKey = (key) => {
    if (key === "ArrowUp") return Direction.UP;
    if (key === "ArrowRight") return Direction.RIGHT;
    if (key === "ArrowDown") return Direction.DOWN;
    if (key === "ArrowLeft") return Direction.LEFT;
    return "";
  };

  function moveLinkedList(linkedlist) {
    let currHead = linkedlist.head;
    let newHead = new Node(currHead.value + 1);
    currHead.next = newHead;
    linkedlist.head = newHead;
    linkedlist.tail = linkedlist.tail.next;
    return linkedlist;
  }

  function moveSnakeCells(snakeCells) {
    let movedSnake = [...snakeCells].map((value) => value + 1);
    return new Set(movedSnake);
  }

  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((value, j) => (
            <div
              key={j}
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
