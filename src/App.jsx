import {useEffect, useState} from 'react'
import Tile from "./components/Tile.jsx";
import DifficultyButton from "./components/DifficultyButton.jsx"
import ResetButton from "./components/ResetButton.jsx";
import {colorsArray, duplicateArray, shuffleArray, generateRandomId} from "./utils/utils.js";
import Confetti from 'react-confetti'

function App() {
    const [tiles, setTiles] = useState([])
    const [difficulty, setDifficulty] = useState(3);

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
        <main className="w-full flex flex-col justify-center items-center">
            {isGameWon && <Confetti/>}
            <h1>{totalCorrect} / {totalPairs}</h1>
            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={3} difficulty={difficulty}>Easy</DifficultyButton>
            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={6} difficulty={difficulty}>Medium</DifficultyButton>
            <DifficultyButton onClick={handleDifficultyChange} difficultyLevel={9} difficulty={difficulty}>Hard</DifficultyButton>
            <ResetButton onClick={handleGameReset} isGameWon={isGameWon}/>
            <section className="w-5/6 bg-slate-300 grid grid-cols-6 grid-rows-3 gap-8 p-8">
                {tilesArray}
            </section>
        </main>
    )
}

export default App
