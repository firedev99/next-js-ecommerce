// remove all -, space(s), _ , (.) period
export default function camelize(text: string): string {
    text = text
        .toLowerCase()
        .trim()
        .split(/[.\-_\s]/g)
        .reduce(
            (string, nextWord) =>
                string + nextWord[0].toUpperCase() + nextWord.slice(1)
        )
    return text
}
