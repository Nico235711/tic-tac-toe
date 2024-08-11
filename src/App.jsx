import { Square } from "./components/Square"
import { useBoard } from "./hooks/useBoard"

// definiendo los turnos
const TURNS = {
  X: "❌",
  O: "⭕"
}

export const App = () => {

  const { board, turn, winner, markWinner, updateBoard, resetGame } = useBoard()

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between items-center p-5 border-b-2 border-b-red-300 mb-5 bg-red-200">
        <h1 className="text-center text-3xl">Tic-Tac-Toe</h1>
        <button
          className="bg-white p-5 rounded-lg shadow text-lg disabled:opacity-50"
          type="button"
          disabled={!winner}
          onClick={resetGame}
        >Reiniciar Juego</button>
      </div>
      <main className="mx-5 relative">
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
        {
          winner !== null && (
            <section className="absolute h-screen w-full bottom-0 grid place-items-center">
              <div className="bg-dark w-72 h-72 lg:w-96 lg:h-96 grid place-items-center rounded-lg border-4">
                <h2 className="text-slate-200 text-3xl">
                  {
                    winner === false ? "Empate" : "Ganó"
                  }
                </h2>
                {
                  winner &&
                  <header>
                    <Square>{winner}</Square>
                  </header>
                }
                <footer>
                  <button
                    className="bg-white p-5 rounded-lg shadow text-lg"
                    type="button"
                    onClick={resetGame}
                  >Reiniciar Juego</button>
                </footer>
              </div>
            </section>
          )
        }
      </main>

    </>)
}
