
export const Square = ({ children, isSelected, updateBoard, index, markWinner }) => {

  const handleClick = () => {
    updateBoard(index)
    
  }  

  return (
    <div
      className={`${isSelected || (markWinner && markWinner[index]) ? "bg-red-300" : ""} w-[100px] h-[100px] border-2 rounded-[5px] grid place-items-center cursor-pointer text-[48px]`}
      onClick={handleClick}
    >{children}</div>
  )
}
