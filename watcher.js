import {exec, spawn} from 'node:child_process'
import { watch } from 'node:fs/promises'
const [node, _, file] = process.argv

function spawnNode () {
    const pr = spawn(node, [file])
    pr.stdout.on('data', function(data){
        console.log(data.toString('utf8'))
    })

    pr.stderr.on('data', function(data){
        console.error(data.toString('utf8'))
    })

    pr.on('close', function(code){
        if (code > 0) {
            throw new Error('Process excited with: ' +code)
        }
    })

    return pr;
}

let childNodeProcess = spawnNode()
const watcher = watch('./', {recursive:true})
for await (const event of watcher) {
    if (event.filename.endsWith('.js')) {
        childNodeProcess.kill()
        childNodeProcess = spawnNode()

    }
}