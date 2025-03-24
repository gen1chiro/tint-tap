import { useEffect, useState } from 'react'
import Tile from "./components/Tile.jsx";
import DifficultyButton from "./components/DifficultyButton.jsx"
import ResetButton from "./components/ResetButton.jsx";
import {colorsArray, duplicateArray, shuffleArray, generateRandomId} from "./utils/utils.js";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";

function App() {
    const [tiles, setTiles] = useState([])
    const [difficulty, setDifficulty] = useState(3);
    const {height, width} = useWindowSize()

    const generateTiles = (diff) => {
        const shuffledColorsArr = shuffleArray(duplicateArray(colorsArray.slice(0, diff)))
        return shuffledColorsArr.map(color => {
            return {
                id: generateRandomId(),
                color: color,
                isFlipped: false,
                isCorrect: false
            }
        })
    }

    useEffect(() => {
        setTiles(generateTiles(difficulty))
    }, [difficulty])

    const isGameWon = tiles.every(tile => tile.isCorrect === true)
    const totalCorrect = tiles.filter(tile => tile.isCorrect === true).length / 2
    const totalPairs = tiles.length / 2

    const handleTileMatch = ([firstTile, secondTile]) => {
        const isMatch = firstTile.color === secondTile.color

        setTimeout(() => {
            setTiles(prevTiles => {
                return prevTiles.map(prevTile => {
                    if (prevTile.id === firstTile.id || prevTile.id === secondTile.id) {
                        return isMatch ? {
                            ...prevTile,
                            isCorrect: true
                        } : {
                            ...prevTile,
                            isFlipped: false
                        }
                    }
                    return prevTile
                })
            })
        }, 1000)
    }

    const handleClick = (id, isFlipped, isCorrect) => {
        if (isFlipped || isCorrect) return

        setTiles(prevTiles => {
            const newTiles = prevTiles.map(prevTile => {
                return prevTile.id === id ? {
                    ...prevTile,
                    isFlipped: !prevTile.isFlipped
                } : prevTile
            })

            const flippedCards = newTiles.filter(tile => tile.isFlipped && !tile.isCorrect)

            if (flippedCards.length === 2) handleTileMatch(flippedCards)

            return newTiles
        })
    }

    const handleDifficultyChange = (change) => {
        setDifficulty(change)
    }

    const handleGameReset = () => {
        setTiles(generateTiles(difficulty))
    }

    const tilesArray = tiles.map(({id, color, isFlipped, isCorrect}) => {
        return (<Tile
            key={id}
            id={id}
            color={color}
            isFlipped={isFlipped}
            isCorrect={isCorrect}
            handleClick={handleClick}
        />)
    })

    return (
        <main className="w-full flex justify-center py-8 font-sans">
            <section className="w-full max-w-3xl flex flex-col justify-center items-center gap-6">
                {isGameWon && <Confetti width={width} height={height}/>}
                <div className="w-full flex justify-between px-8 py-4 shadow-xl rounded-2xl gap-4">
                    <div className="flex flex-col flex-grow max-w-xs">
                        <h1 className="font-semibold text-xl">Total</h1>
                        <div>
                            <div className="h-2 bg-slate-300 rounded-full">
                                <div className="h-2 bg-slate-800 rounded-full" style={{ width: `${(totalCorrect / totalPairs) * 100}%` }}></div>
                            </div>
                            <h1>{totalCorrect} / {totalPairs}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">Difficulty</h1>
                        <div className="flex items-center gap-1">
                            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={3}
                                              difficulty={difficulty}>Easy</DifficultyButton>
                            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={6}
                                              difficulty={difficulty}>Medium</DifficultyButton>
                            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={9}
                                              difficulty={difficulty}>Hard</DifficultyButton>
                            <ResetButton onClick={handleGameReset}/>
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-3 place-items-center gap-8 p-8">
                    {tilesArray}
                </div>
            </section>
        </main>
    )
}

export default App
