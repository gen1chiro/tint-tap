import { ReactNode } from 'react';

interface DifficultyButtonProps {
    onClick: (difficultyLevel: number) => void
    difficultyLevel: number
    difficulty: number
    children: ReactNode
}

const DifficultyButton = ({onClick, difficultyLevel, difficulty, children}: DifficultyButtonProps) => {
    const isDisabled = difficulty === difficultyLevel

    return (
        <button onClick={() => onClick(difficultyLevel)} disabled={isDisabled}
                className={`px-4 py-1 rounded ${isDisabled ? 'bg-gray-400' : 'bg-black'} font-semibold text-white rounded-full hover:bg-gray-400 hover:cursor-pointer transition-colors ease-out`}>
            {children}
        </button>
    )
}

export default  DifficultyButton;