import {readFile, writeFile} from 'node:fs/promises'

// const data = await readFile('demo2.txt', 'utf8')
// console.log(data)

await writeFile('demo2.txt', 'le tonnerre', {flag: 'a'})