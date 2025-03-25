const Tile = ({id, color, isFlipped, isCorrect, handleClick}) => {
    return (
        <div
            className={`w-full aspect-square border-1 border-gray-400 rounded-full ${isFlipped ? color : 'bg-white'} 
                        ${isFlipped ? 'rotate-y-180' : 'rotate-y-[-180]'} 
                        ${isCorrect ? 'animate-snap' : ''} 
                        hover:border-2 transition-transform duration-500`}
            onClick={() => handleClick(id, isFlipped, isCorrect)}
        ></div>
    )
}

export default Tile