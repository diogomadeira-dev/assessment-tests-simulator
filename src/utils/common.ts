export const nextChar = (character: string | undefined) => {
  if (!character) return 'A'
  return String.fromCharCode(character.charCodeAt(0) + 1)
}
