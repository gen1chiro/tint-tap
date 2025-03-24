const DifficultyButton = ({onClick, difficultyLevel, difficulty, children}) => {
    const isDisabled = difficulty === difficultyLevel

    return (
        <button onClick={() => onClick(difficultyLevel)} disabled={isDisabled}
                className={`border-2 px-4 py-1 rounded ${isDisabled ? 'bg-gray-600' : 'bg-black'} font-medium rounded-full text-white hover:bg-gray-600 hover:cursor-pointer transition-colors ease-out`}>
            {children}
        </button>
    )
}

export default  DifficultyButton;