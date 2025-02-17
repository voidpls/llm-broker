const fastify = require('fastify')
const fs = require('fs/promises')
const config = require('./config.json')

const app = fastify({logger: true})

// TODO: add timeout for response generation
// TODO: image capability
// TODO: if response too long, handle

async function main () {
  const getAvailableModels = await initModels()

  app.get('/models', async (req, reply) => {
    const availModels = await getAvailableModels()
    const availModelsFormatted = availModels.map(m => {
      return {
        name: m.name,
        id: m.id
      }
    })

    return {
      supportedModels: availModelsFormatted,
      error: false
    }
  })

  // initialize endpoints for each model
  const models = await getAvailableModels()
  const bodySchema = {
    type: 'object',
    properties: { prompt: { type: 'string' } },
    required: ['prompt']
  }
  models.forEach(model => {
    const endpoint = `/models/${model.id}` // eg. '/models/deepseek-ai/DeepSeek-R1'
    app.post(endpoint, {
      schema: {
        body: bodySchema
      }
    },
    async (req, reply) => {
      const { prompt } = req.body
      const start = performance.now()
      const modelResponse = await model.getResponse(prompt)
      const elapsedTime = ((performance.now() - start) / 1000).toFixed(1)
      return {
        response: model.cleanResponse(modelResponse),
        elapsedTime,
        error: false
      }
    })
  })
  console.log(`Initialized ${models.length} models: ${models.map(m => m.id).join(', ')}`)

  // listen
  app.listen({ port: config.port }).then(() => {
    console.log(`API running at http://localhost:${config.port}/`)
  })
}

// requires all model files and returns a method that returns list of models
async function initModels () {
  let models
  return async () => {
    if (models) return models

    const Model = require('./models/model.js')
    const modelFiles = await fs.readdir('./models')
    models = modelFiles
      .filter(f => f.endsWith('js'))
      .map(f => require(`./models/${f}`)) // transform file name into exported model/class objects
      .filter(m => m instanceof Model)
    return models
  }
}

main()
