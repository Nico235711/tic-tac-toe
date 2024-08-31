import { Square } from './Square'

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null
  const winnerText = winner === false ? "Empate" : "Ganó"

  return (

    <section className="absolute bottom-0 grid w-full h-screen place-items-center">
      <div className="grid border-4 rounded-lg bg-dark w-72 h-72 lg:w-96 lg:h-96 place-items-center">
        <h2 className="text-3xl text-slate-200">{winnerText}</h2>
        {
          winner &&
          <header>
            <Square>{winner}</Square>
          </header>
        }
        <footer>
          <button
            className="p-5 text-lg bg-white rounded-lg shadow"
            type="button"
            onClick={resetGame}
          >Reiniciar Juego</button>
        </footer>
      </div>
    </section>
  )
}
