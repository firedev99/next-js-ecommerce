import { bgColors } from '../dummy/dummyDB'

function randomNumber_limit(num: number) {
    return Math.floor(Math.random() * num + 1)
}

function randomNumber_numbers(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNumber_sign(num: number) {
    return Math.random() > 0.5
        ? Math.floor(Math.random() * num + 1)
        : Math.floor(Math.random() * num * -1)
}

function randomBGC() {
    return bgColors[Math.floor(Math.random() * bgColors.length)]
}

function randomColor() {
    return 'hsla(' + Math.random() * 360 + ', 80%, 70%, 0.4)'
}

function generateRandomArray<T>(data: string[] | T[]) {
    return data[Math.floor(Math.random() * data.length)]
}

const randomMethods = {
    randomNumber_limit,
    randomNumber_numbers,
    randomNumber_sign,
    randomBGC,
    randomColor,
    generateRandomArray,
}

export default randomMethods
