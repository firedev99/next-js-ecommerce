export function smalify(text: string) {
    return text.split(' ').join('-').toLowerCase() || text.toLowerCase()
}
