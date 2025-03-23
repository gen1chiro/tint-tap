const DifficultyButton = ({onClick, difficultyLevel, difficulty, children}) => {
    const isDisabled = difficulty === difficultyLevel

    return (
        <button onClick={() => onClick(difficultyLevel)} disabled={isDisabled}
                className={`border-2 px-2 rounded ${isDisabled ? 'bg-slate-300' : ''} hover:cursor-pointer`}>
            {children}
        </button>
    )
}

export default  DifficultyButton;