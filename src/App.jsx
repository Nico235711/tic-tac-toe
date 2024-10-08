import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"
import { TURNS } from "./constants/constants"
import { useBoard } from "./hooks/useBoard"

export const App = () => {

  const { board, turn, winner, markWinner, updateBoard, resetGame } = useBoard()

  return (
    <>
      <div className="p-5 border-b-2 border-b-red-300 mb-5 bg-red-200">
        <h1 className="text-center text-3xl">Tic-Tac-Toe</h1>
      </div>
      <main className="mx-5 mb-5 relative">
        <section className="grid grid-cols-3 gap-4 w-fit mx-auto">
          {
            board.map((_, index) => (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                markWinner={markWinner}
              >
                {board[index]}
              </Square>
            ))
          }
        </section>

        <section className="mt-5 flex justify-center gap-5">
          <Square isSelected={turn === TURNS.X}>{TURNS.O}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.X}</Square>
        </section>
        <WinnerModal
          winner={winner} 
          resetGame={resetGame}
        />
      </main>

    </>)
}
