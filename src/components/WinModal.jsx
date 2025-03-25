const WinModal = ({ref, handleClose}) => {
    return (
        <dialog ref={ref} className="m-auto w-96 rounded-2xl p-4">
            <h1 className="font-bold text-xl text-left">Congratulations! You have won the game!</h1>
            <p>Press the reset button to play again.</p>
            <button onClick={handleClose} className="bg-black text-white px-4 py-1 rounded-full mt-4 hover:bg-gray-600">close</button>
        </dialog>
    )
}

export default WinModal