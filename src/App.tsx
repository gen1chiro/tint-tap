import { useEffect, useState, useRef } from 'react'
import Tile from "./components/Tile.tsx";
import DifficultyButton from "./components/DifficultyButton.tsx"
import ResetButton from "./components/ResetButton.tsx";
import WinModal from "./components/WinModal.tsx";
import { colorsArray, duplicateArray, shuffleArray, generateRandomId } from "./utils/utils.ts";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";

type Tile = {
    id: string
    color: string
    isFlipped: boolean
    isCorrect: boolean
}

function App() {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [tiles, setTiles] = useState<Tile[]>([])
    const [difficulty, setDifficulty] = useState(3)
    const [isHandlingMatch, setIsHandlingMatch] = useState(false)
    const {height, width} = useWindowSize()

    const generateTiles = (diff: number): Tile[] => {
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

    const isGameWon = tiles.every(tile => tile.isCorrect)
    const totalCorrect = tiles.filter(tile => tile.isCorrect).length / 2
    const totalPairs = tiles.length / 2

    if(isGameWon) {
        if (modalRef.current) modalRef.current?.showModal()
    }

    const handleClose = () => {
        if (modalRef.current) modalRef.current?.close()
    }

    const handleTileMatch = ([firstTile, secondTile]: Tile[]) => {
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
                    setIsHandlingMatch(false)
                    return prevTile
                })
            })
        }, 1000)
    }

    const handleClick = (id: string, isFlipped: boolean, isCorrect: boolean) => {
        if (isFlipped || isCorrect) return
        if (isHandlingMatch) return

        setTiles(prevTiles => {
            const newTiles: Tile[] = prevTiles.map(prevTile => {
                return prevTile.id === id ? {
                    ...prevTile,
                    isFlipped: !prevTile.isFlipped
                } : prevTile
            })

            const flippedCards: Tile[] = newTiles.filter(tile => tile.isFlipped && !tile.isCorrect)

            if (flippedCards.length === 2) {
                setIsHandlingMatch(true)
                handleTileMatch(flippedCards)
            }

            return newTiles
        })
    }

    const handleDifficultyChange = (change: number) => {
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
        <main className="w-full flex justify-center py-8 font-sans ">
            <section className="w-full max-w-3xl flex flex-col justify-center items-center gap-6">
                {isGameWon && <Confetti width={width} height={height}/>}
                <WinModal modalRef={modalRef} handleClose={handleClose}/>
                <div className="w-11/12 flex flex-col sm:flex-row justify-between px-8 py-4 shadow-xl rounded-2xl gap-4">
                    <div className="flex flex-col flex-grow sm:max-w-xs">
                        <h1 className="font-semibold text-xl">Total</h1>
                        <div>
                            <div className="h-2 bg-slate-300 rounded-full">
                                <div className="h-2 bg-black rounded-full" style={{ width: `${(totalCorrect / totalPairs) * 100}%` }}></div>
                            </div>
                            <h1>{totalCorrect} / {totalPairs}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">Difficulty</h1>
                        <div className="flex items-center w-full gap-1">
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
                <div className="w-11/12 grid grid-cols-3 place-items-center gap-2 sm:gap-8 p-8">
                    {tilesArray}
                </div>
            </section>
        </main>
    )
}

export default App
