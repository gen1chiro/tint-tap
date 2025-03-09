const Tile = ({id, color, isFlipped, isCorrect}) => {
    return (
        <div className={`w-40 aspect-square ${isFlipped ? color : 'bg-slate-200'}`}>
            {color}
        </div>
    )
}

export default Tile