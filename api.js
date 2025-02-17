const fastify = require('fastify')
const fs = require('fs/promises')
const config = require('./config.json');
const { P } = require('pino');

const app = fastify()
let models; 

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

  // listen
  app.listen({ port: config.port }).then(() => {
    console.log(`API running at http://localhost:${config.port}/`)
  })
}

// requires all model files and returns a method that returns list of models
async function initModels () {
    let models = undefined
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