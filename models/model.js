const OpenAI = require('openai')

class Model {
  constructor (modelName, modelID, apiEndpoint, apiKey, parameters = {}) {
    this.name = modelName
    this.id = modelID
    this.apiEndpoint = apiEndpoint
    this.apiKey = apiKey
    this.parameters = parameters

    this.client = new OpenAI({
      baseURL: this.apiEndpoint,
      apiKey: this.apiKey
    })
  }

  async getResponse (prompt) {
    const completion = await this.client.chat.completions.create({

      model: this.id,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      ...this.parameters
    })
    return completion.choices[0].message.content
  }

  cleanResponse (response) {
    return response.trim() // each model will have its own cleanResponse method if needed
  }
}

module.exports = Model
