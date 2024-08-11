import { Square } from './Square'

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null
  const winnerText = winner === false ? "Empate" : "Ganó"

  return (

    <section className="absolute h-screen w-full bottom-0 grid place-items-center">
      <div className="bg-dark w-72 h-72 lg:w-96 lg:h-96 grid place-items-center rounded-lg border-4">
        <h2 className="text-slate-200 text-3xl">{winnerText}</h2>
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
