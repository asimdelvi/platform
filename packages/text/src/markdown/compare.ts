/**
 * Calculate Sørensen–Dice coefficient
 */
export function calcSørensenDiceCoefficient (a: string, b: string): number {
  const first = a.replace(/\s+/g, '')
  const second = b.replace(/\s+/g, '')

  if (first === second) return 1 // identical or empty
  if (first.length < 2 || second.length < 2) return 0 // if either is a 0-letter or 1-letter string

  const firstBigrams = new Map<string, number>()
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2)
    const count = (firstBigrams.get(bigram) ?? 0) + 1

    firstBigrams.set(bigram, count)
  }

  let intersectionSize = 0
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2)
    const count = firstBigrams.get(bigram) ?? 0

    if (count > 0) {
      firstBigrams.set(bigram, count - 1)
      intersectionSize++
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2)
}

/**
 * Perform markdown diff/comparison to understand do we have a major differences.
 */
export function isMarkdownsEquals (source1: string, source2: string): boolean {
  const lines1 = source1
    .split('\n')
    .map((it) => it.trimEnd())
    .join('\n')
  const lines2 = source2
    .split('\n')
    .map((it) => it.trimEnd())
    .join('\n')
  return lines1 === lines2
}