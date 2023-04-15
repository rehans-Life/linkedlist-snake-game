const randomIntInIntervel = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createBoard = (board_size) => {
  let board = [];
  let counter = 1;
  for (let i = 0; i < board_size; i++) {
    let row = [];
    for (let j = 0; j < board_size; j++) row.push(counter++);
    board.push(row);
  }
  return board;
};
