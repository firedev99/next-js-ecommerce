export function splitToDigit(num: number) {
    return (num + '').split('').map((i) => {
        return Number(i)
    })
}
