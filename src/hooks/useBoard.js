import confetti from "canvas-confetti"
import { useEffect, useState } from "react"

export const useBoard = () => {

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
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(updatedBoard)) setWinner(false)
  }

  const resetGame = () => {

    setBoard(Array(9).fill(null))
    setTurn(TURNS.O)

    setWinner(null)
    setMarkWinner(Array(9).fill(null))
  }

  return {
    board,
    turn,
    winner,
    markWinner,
    updateBoard,
    resetGame
  }
}
