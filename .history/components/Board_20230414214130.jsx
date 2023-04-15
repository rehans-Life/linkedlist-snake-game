import React, { useState } from "react";

const BOARD_SIZE = 10;

export default function Board() {
  const [board, setBoard] = useState(new Array(BOARD_SIZE).fill(0));
  return <div>Board</div>;
}
