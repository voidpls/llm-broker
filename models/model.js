const OpenAI = require('openai')

class Model {
  constructor (modelName, modelID, apiEndpoint, apiKey, temp = 0.6, maxTokens = 8192, top_p = 1.0) {
    this.name = modelName
    this.id = modelID
    this.apiEndpoint = apiEndpoint
    this.apiKey = apiKey
    this.temp = temp
    this.maxTokens = maxTokens
    this.top_p = top_p
    this.client = new OpenAI({
      baseURL: this.apiEndpoint,
      apiKey: this.apiKey
    })
  }

  async getResponse (prompt) {
    const completion = await this.client.chat.completions.create({
      temp: this.temp,
      model: this.id,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: this.maxTokens,
      top_p: this.top_p
    })
    return completion
  }
}

module.exports = Model
