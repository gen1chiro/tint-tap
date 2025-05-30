interface ResetButtonProps {
    onClick: () => void
}

const ResetButton = ({onClick}: ResetButtonProps) => {
    return (
        <button onClick={onClick} className="aspect-square w-8 bg-black hover:bg-gray-400 rounded-full flex justify-center items-center">
            <svg className="fill-white" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0"
                    />
            </svg>
        </button>
    )
}

export default ResetButton