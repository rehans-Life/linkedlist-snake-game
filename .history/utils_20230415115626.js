const randomIntInIntervel = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createBoard = (board_size, setBoard) => {
  let board = [];
  let counter = 1;
  for (let i = 0; i < board_size; i++) {
    let row = [];
    for (let i = 0; i < board_size; i++) row.push(counter++);
    board.push(row);
  }
};
