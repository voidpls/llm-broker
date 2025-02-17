require('dotenv').config()
const Model = require('./model.js')
const { OPENAI_KEY } = process.env

const modelName = 'OpenAI o3-mini'
const modelID = 'o3-mini'
const apiEndpoint = 'https://api.openai.com/v1/'
const apiKey = OPENAI_KEY

const model = new Model(modelName, modelID, apiEndpoint, apiKey, {
  max_completion_tokens: 8192,
  response_format: {
    type: 'text'
  },
  reasoning_effort: 'high'
})

// model.cleanResponse = response => {
//   return response
//     .trim()
// }

module.exports = model
