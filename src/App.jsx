import { useEffect, useState } from "react"
import { Square } from "./components/Square"

// definiendo los turnos
const TURNS = {
  X: "❌",
  O: "⭕"
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

const initialBoard = () => {
  const localStorageBoard = localStorage.getItem("board")
  return localStorageBoard ? JSON.parse(localStorageBoard) : Array(9).fill(null)
}

export const App = () => {

  // mi tablero (estado)
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState(TURNS.O)

  // null -> hay ganador, false -> empate
  const [winner, setWinner] = useState(null)
  const [markWinner, setMarkWinner] = useState(Array(9).fill(null))

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board))
  }, [board]);

  const checkWinner = (boardToCheck) => {
    // reviso todas las combinaciones ganadoras
    for (let combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // hay una x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        const updatedMarkWinner = [...markWinner]
        updatedMarkWinner[a] = true
        updatedMarkWinner[b] = true
        updatedMarkWinner[c] = true
        setMarkWinner(updatedMarkWinner)
        return boardToCheck[a]
      }
    }

    // no hay ganador
    return null
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every(square => square !== null)
  }

  const updateBoard = (index) => {
    // ya tiene algo o si hay un ganador
    if (board[index] || winner) return
    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O
    // actualizo el turno con el nuevo turno
    setTurn(newTurn)
    const updatedBoard = [...board]
    updatedBoard[index] = newTurn // guardo el turno
    setBoard(updatedBoard)
    const newWinner = checkWinner(updatedBoard)
    if (newWinner) setWinner(newWinner)
    else if (checkEndGame(updatedBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {

    setBoard(Array(9).fill(null))
    setTurn(TURNS.O)

    setWinner(null)
    setMarkWinner(Array(9).fill(null))
  }

  return (
    <>
      <div className="flex flex-col gap-5 lg:justify-between items-center p-5 border-b-2 border-b-red-300 mb-5 bg-red-200">
        <h1 className="text-center text-3xl">Tic-Tac-Toe</h1>
        <button
          className="bg-white p-5 rounded-lg shadow text-lg disabled:opacity-50"
          type="button"
          disabled={!winner}
          onClick={resetGame}
        >Reiniciar Juego</button>
      </div>
      <main className="mx-5">
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
            <>
            {
              winner ? (
                <p className="bg-white p-5 shadow rounded-lg w-1/2 mx-auto text-center text-xl my-10">El ganaror es {winner}</p>
              ) : (
                <div className="flex flex-col gap-1 items-center md:flex-row md:justify-evenly">
                  <p className="bg-white p-5 shadow rounded-lg w-1/2 mx-auto text-center text-xl my-10">Empate</p>
                  <button
                    className="bg-white p-5 rounded-lg shadow text-lg disabled:opacity-50"
                    type="button"
                    onClick={resetGame}
                  >Reiniciar Juego</button>
                </div>
              )
            }
            </>
          )
        }
      </main>

    </>)
}
