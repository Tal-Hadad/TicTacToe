import { useState } from "react";
const initialBoard = new Array(9).fill(null);

export const useTictactoe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && !board.includes(null);
  const gameOver = winner || isDraw;

  const handleTileClick = (index) => {
    if (gameOver || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const statusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a draw!";
    return `Player ${isXNext ? "X" : "O"}'s turn`;
  };

  return {
    board,
    handleTileClick,
    calculateWinner,
    resetGame,
    statusMessage,
    gameOver,
    isXNext,
  };
};
