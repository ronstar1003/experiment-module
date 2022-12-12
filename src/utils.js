export function generateIterationTitle (currentTitleList) {
  let i = 1
  while (true) {
    const newTitle = 'Iteration ' + i
    if (currentTitleList.indexOf(newTitle) === -1) return newTitle
    i++
  }
}
