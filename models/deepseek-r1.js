require('dotenv').config()
const Model = require('./model.js')
const { NEBIUS_KEY } = process.env

const modelName = 'Deepseek R1'
const modelID = 'deepseek-ai/DeepSeek-R1'
const apiEndpoint = 'https://api.studio.nebius.ai/v1/'
const apiKey = NEBIUS_KEY

const model = new Model(modelName, modelID, apiEndpoint, apiKey,
  temp = 0.6,
  maxTokens = 8192,
  top_p = 0.95
)

module.exports = model
