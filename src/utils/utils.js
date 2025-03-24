export const colorsArray = [
    'bg-red-300',
    'bg-orange-300',
    'bg-yellow-200',
    'bg-green-300',
    'bg-blue-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-rose-300',
    'bg-slate-300',
]

export const duplicateArray = (array) => [...array, ...array]

export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}
export const generateRandomId = () => {
    return Math.random().toString(36).slice(2, 11)
}