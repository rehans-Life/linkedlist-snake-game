/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { createBoard, randomIntInIntervel } from "../utils";

const BOARD_SIZE = 13;

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

const reverseDirection = {
  UP: "DOWN",
  RIGHT: "LEFT",
  DOWN: "UP",
  LEFT: "RIGHT",
};

const initialRow = Math.floor(BOARD_SIZE / 2);
const initialCol = Math.floor(BOARD_SIZE / 2);

export default function Board() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));

  // A set to store the values of all snake cells intially our snake will be of size
  // one cell and start from the 44th cells.
  const [snakeCells, setSnakeCells] = useState(
    new Set([board[initialRow][initialCol]])
  );

  // A linked list for our snake initally going to have only one node which
  // is at cell 44.
  const [linkedlist, setLinkedList] = useState(
    new SinglyLinkedList({
      value: board[initialRow][initialCol],
      row: initialRow,
      col: initialCol,
    })
  );

  const [foodCell, setFoodCell] = useState(board[initialRow][initialCol] + 5);
  const [direction, setDirection] = useState(Direction.RIGHT);

  const [reverseLinkedList, setReverseLinkedList] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeyDown(e.key);
    });
    let gameStartInternal = setInterval(() => {
      setLinkedList((currLinkedList) => moveLinkedList(currLinkedList));
    }, 250);
    return () => {
      clearInterval(gameStartInternal);
    };
  }, [direction, foodCell, snakeCells]);

  useEffect(() => {
    setSnakeCells((currSnakeCells) => moveSnakeCells(currSnakeCells));
  }, [linkedlist]);

  useEffect(() => {
    setCounter((curr) => curr + 1);
  }, [foodCell]);

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

  function moveLinkedList(originalLinkedlist) {
    let linkedList = copyLinkedList(originalLinkedlist);
    let currHead = linkedList.head;
    let newHead = createNewNodeInDirection(board, currHead);

    if (!newHead) {
      setFoodCell(85);
      setDirection(Direction.RIGHT);
      setCounter(0);
      return new SinglyLinkedList({ value: 80, row: 5, col: 4 });
    }

    currHead.next = newHead;
    if (newHead.value === foodCell) {
      if (reverseLinkedList) {
        let reversedLinkedList = createReverseLinkedList(linkedList);
        let newDirection = newReverseDirection(originalLinkedlist.tail);
        setDirection(newDirection);
        while (true) {
          let newFoodCell = randomIntInIntervel(
            1,
            board[BOARD_SIZE - 1][BOARD_SIZE - 1]
          );
          if (!snakeCells.has(newFoodCell)) {
            setReverseLinkedList(Math.random() < 0.3);
            setFoodCell(newFoodCell);
            break;
          }
        }
        return { head: reversedLinkedList.head, tail: currHead };
      }

      let growthCell = createNewNodeForGrowth(board, linkedList.tail);
      let temp = linkedList.tail;
      linkedList.tail = growthCell;
      linkedList.tail.next = temp;

      while (true) {
        let newFoodCell = randomIntInIntervel(
          1,
          board[BOARD_SIZE - 1][BOARD_SIZE - 1]
        );
        if (!snakeCells.has(newFoodCell)) {
          setReverseLinkedList(Math.random() < 0.3);
          setFoodCell(newFoodCell);
          break;
        }
      }
    }
    return { head: newHead, tail: linkedList.tail.next };
  }

  function newReverseDirection(currHead) {
    let newDirection;
    let nextToHead = currHead.next;

    if (!nextToHead) {
      if (direction === "RIGHT") newDirection = reverseDirection["RIGHT"];
      else if (direction === "LEFT") newDirection = reverseDirection["LEFT"];
      else if (direction === "UP") newDirection = reverseDirection["UP"];
      else newDirection = reverseDirection["DOWN"];
      return newDirection;
    }

    if (direction === "RIGHT") {
      if (nextToHead.col === currHead.col - 1) {
        newDirection = "RIGHT";
      } else {
        newDirection = "LEFT";
      }
    }

    if (direction === "LEFT") {
      if (nextToHead.col === currHead.col + 1) {
        newDirection = "LEFT";
      } else {
        newDirection = "RIGHT";
      }
    }

    if (direction === "UP") {
      if (nextToHead.row === currHead.row + 1) {
        newDirection = "UP";
      } else {
        newDirection = "DOWN";
      }
    }

    if (direction === "DOWN") {
      if (nextToHead.row === currHead.row - 1) {
        newDirection = "DOWN";
      } else {
        newDirection = "UP";
      }
    }
    return newDirection;
  }

  function createReverseLinkedList(linkedList) {
    let tail = linkedList.tail;
    let curr = null;
    let prev = tail;

    while (prev) {
      let temp = prev.next;
      prev.next = curr;
      curr = prev;
      prev = temp;
    }

    return { head: tail, tail: curr };
  }

  function createNewNodeForGrowth(board, currTail) {
    let newTail;
    if (direction === "LEFT")
      newTail = new Node(
        board[currTail.row][currTail.col + 1],
        currTail.row,
        currTail.col + 1
      );
    else if (direction === "RIGHT")
      newTail = new Node(
        board[currTail.row][currTail.col - 1],
        currTail.row,
        currTail.col - 1
      );
    else if (direction === "DOWN") {
      if (currTail.row - 1 < 0) {
        newTail = new Node(
          board[currTail.row + 1][currTail.col],
          currTail.row + 1,
          currTail.col
        );
      } else {
        newTail = new Node(
          board[currTail.row - 1][currTail.col],
          currTail.row - 1,
          currTail.col
        );
      }
    } else if (direction === "UP") {
      if (currTail.row + 1 >= BOARD_SIZE) {
        newTail = new Node(
          board[currTail.row - 1][currTail.col],
          currTail.row - 1,
          currTail.col
        );
      } else {
        newTail = new Node(
          board[currTail.row + 1][currTail.col],
          currTail.row + 1,
          currTail.col
        );
      }
    }

    return newTail;
  }

  function createNewNodeInDirection(board, currHead) {
    let newHead = false;
    if (
      direction === "LEFT" &&
      currHead.col - 1 >= 0 &&
      !snakeCells.has(board[currHead.row][currHead.col - 1])
    )
      newHead = new Node(
        board[currHead.row][currHead.col - 1],
        currHead.row,
        currHead.col - 1
      );
    else if (
      direction === "RIGHT" &&
      currHead.col + 1 < BOARD_SIZE &&
      !snakeCells.has(board[currHead.row][currHead.col + 1])
    )
      newHead = new Node(
        board[currHead.row][currHead.col + 1],
        currHead.row,
        currHead.col + 1
      );
    else if (
      direction === "DOWN" &&
      currHead.row + 1 < BOARD_SIZE &&
      !snakeCells.has(board[currHead.row + 1][currHead.col])
    )
      newHead = new Node(
        board[currHead.row + 1][currHead.col],
        currHead.row + 1,
        currHead.col
      );
    else if (
      direction === "UP" &&
      currHead.row - 1 >= 0 &&
      !snakeCells.has(board[currHead.row - 1][currHead.col])
    )
      newHead = new Node(
        board[currHead.row - 1][currHead.col],
        currHead.row - 1,
        currHead.col
      );
    return newHead;
  }

  function copyLinkedList(linkedList) {
    let node = linkedList.tail;
    let newNode = new Node(node.value, node.row, node.col);
    let newTail = newNode;
    while (node.next) {
      let next = node.next;
      let newNext = new Node(next.value, next.row, next.col);
      node = next;
      newNode.next = newNext;
      newNode = newNext;
    }
    return {
      head: newNode,
      tail: newTail,
    };
  }

  function moveSnakeCells() {
    let movedSnake = [];
    let node = linkedlist.tail;

    while (node) {
      movedSnake.push(node.value);
      node = node.next;
    }
    movedSnake.reverse();
    return new Set(movedSnake);
  }

  const infos = [
    {
      color: "purple",
      text: "Reverses the Linked List",
    },
    {
      color: "red",
      text: "Adds a node to theLinked List",
    },
  ];

  const Info = ({ text, color }) => {
    return (
      <div className={styles.info}>
        <div
          className={`${styles.circle} ${
            color === "purple" ? styles.reverse : styles.food
          }`}
        ></div>
        <p className={styles.text}>{text}</p>
      </div>
    );
  };

  return (
    <div>
      <h2 className={styles.score}>Score: {counter}</h2>
      <div className={styles.infos}>
        {infos.map(({ color, text }, index) => (
          <Info text={text} color={color} key={index} />
        ))}
      </div>
      <div className={styles.board}>
        {board.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((value, j) => (
              <div
                key={j}
                className={`${styles.cell} ${
                  linkedlist.head.value === value
                    ? styles.head
                    : snakeCells.has(value)
                    ? styles.snake_cell
                    : reverseLinkedList && value === foodCell
                    ? styles.reverse_cell
                    : value === foodCell
                    ? styles.food_cell
                    : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
