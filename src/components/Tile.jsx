const Tile = ({id, color, isFlipped, isCorrect, handleClick}) => {
    return (
        <div
            className={`w-40 aspect-square ${isFlipped ? color : 'bg-slate-200'} 
                        ${isFlipped ? 'rotate-y-180' : 'rotate-y-[-180]'} 
                        ${isCorrect ? 'animate-snap' : ''} 
                        transition-transform duration-500`}
            onClick={() => handleClick(id, isFlipped, isCorrect)}
        >
            {color}
        </div>
    )
}

export default Tile