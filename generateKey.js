const { randomUUID } = require('crypto')
const { readFileSync, writeFileSync } = require('fs')

const uuid = randomUUID()

const file = readFileSync('./apiKeys.json', 'utf8')
const jsonData = JSON.parse(file)
jsonData.push(uuid)
const jsonString = JSON.stringify(jsonData, null, 2)

writeFileSync('./apiKeys.json', jsonString)

console.log('Generated new API key:', uuid)
