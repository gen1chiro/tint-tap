const Tile = ({id, color, isFlipped, isCorrect, handleClick}) => {
    return (
        <div className={`w-40 aspect-square ${isFlipped ? color : 'bg-slate-200'}`} onClick={() => handleClick(id, isFlipped, isCorrect)}>
            {color}
        </div>
    )
}

export default Tile