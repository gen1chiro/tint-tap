import React from "react";

interface WinModalProps {
    modalRef: React.RefObject<HTMLDialogElement | null>
    handleClose: () => void
}

const WinModal = ({modalRef, handleClose}: WinModalProps) => {
    return (
        <dialog ref={modalRef} className="m-auto w-96 rounded-2xl p-4">
            <h1 className="font-bold text-xl text-left">Congratulations! You have won the game!</h1>
            <p>Press the reset button to play again.</p>
            <button onClick={handleClose} className="bg-black text-white px-4 py-1 rounded-full mt-4 hover:bg-gray-600">close</button>
        </dialog>
    )
}

export default WinModal