import api from './api'

export const aiService = {
  generate: (businessData) => api.post('/ai/generate', businessData),
  regenerateSection: (section, businessData) =>
    api.post('/ai/regenerate-section', { section, businessData }),
}
