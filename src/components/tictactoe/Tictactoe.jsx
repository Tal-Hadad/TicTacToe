import styles from "./Tictactoe.module.css";
import { useTictactoe } from "../../hooks/useTictactoe";
import { useEffect, useState } from "react";

export default function Tictactoe() {
  const {
    board,
    handleTileClick,
    resetGame,
    statusMessage,
    gameOver,
    isXNext,
  } = useTictactoe();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [hoveredIndex, setHoveredIndex] = useState(null);

  const message = statusMessage();
  // const hoverValue = isXNext ? "X" : "O";

  useEffect(() => {
    if (gameOver) {
      setIsModalOpen(true);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);
  const handlePlayAgain = () => {
    setIsModalOpen(false);
    resetGame();
  };

  return (
    <div className={styles.gameContainer}>
      <section className={styles.board}>
        {board.map((b, index) => {
          return (
            <button
              className={`${styles.tile} ${b === null && !gameOver ? styles.emptytile : ""}`}
              key={index}
              onClick={() => handleTileClick(index)}
              disabled={b !== null}
              data-preview={isXNext ? "X" : "O"}
              data-value={b ?? ""}
            >
              {b}
            </button>
          );
        })}
      </section>
      <section className={styles.info}>
        <div className={styles.status}>{message}</div>
        <button className={styles.resetbtn} onClick={resetGame}>
          Play again
        </button>
      </section>
      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Game over</h2>
            <span className={styles.modalrow}>
              <h2>{message}</h2>
              <button className={styles.resetbtn} onClick={handlePlayAgain}>
                Play again
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
