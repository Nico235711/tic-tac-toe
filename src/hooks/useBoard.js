import confetti from "canvas-confetti"
import { useEffect, useState } from "react"
import { TURNS, WINNER_COMBOS } from "../constants/constants"

const initialBoard = () => {
  const localStorageBoard = localStorage.getItem("board")
  return localStorageBoard ? JSON.parse(localStorageBoard) : Array(9).fill(null)
}

const initialTurn = () => {
  const localStorageTurn = localStorage.getItem("turn")
  return localStorageTurn ? localStorageTurn : TURNS.O
}

const initialWinner = () => {
  const localStorageWinner = localStorage.getItem("winner")
  return localStorageWinner !== "null" ? localStorageWinner : null
}

export const useBoard = () => {

  // mi tablero (estado)
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState(initialTurn)

  // null -> hay ganador, false -> empate
  const [winner, setWinner] = useState(initialWinner)
  const [markWinner, setMarkWinner] = useState(Array(9).fill(null))

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board))
  }, [board]);

  useEffect(() => {
    localStorage.setItem("turn", turn)
  }, [turn]);

  useEffect(() => {
    localStorage.setItem("winner", winner)
  }, [winner]);

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
