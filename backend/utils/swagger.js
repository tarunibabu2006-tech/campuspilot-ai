import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CampusPilot AI — API Documentation',
      version: '2.0.0',
      description: `
## 🎓 CampusPilot AI Backend API

Enterprise-grade REST API powering the CampusPilot AI platform — an AI-first career & academic platform for Indian engineering students.

### Features
- 🤖 **Gemini AI Integration** — 15+ AI-powered tools
- 🔐 **JWT Authentication** — Google OAuth + Admin login
- 🗄️ **Redis Caching** — Intelligent response caching
- ⚡ **BullMQ Queues** — Asynchronous heavy AI task processing
- 🧠 **RAG Vector Search** — Hallucination-free document chat

### Authentication
All protected routes require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your_token>
\`\`\`
      `,
      contact: {
        name: 'CampusPilot AI Team',
        email: 'tarunibabu2006@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local Development' },
      { url: 'https://campuspilot-backend.vercel.app', description: 'Production' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        AuthLoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@campuspilot.ai' },
            password: { type: 'string', minLength: 6, example: 'securepassword123' },
            remember: { type: 'boolean', example: false }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT access token' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string', enum: ['admin', 'student'] }
              }
            }
          }
        },
        PlacementRoadmapRequest: {
          type: 'object',
          required: ['company', 'role'],
          properties: {
            company: { type: 'string', example: 'Google' },
            role: { type: 'string', example: 'SDE-2' },
            currentSkills: { type: 'string', example: 'JavaScript, React, Node.js' },
            language: { type: 'string', example: 'English', default: 'English' }
          }
        },
        CareerPredictorRequest: {
          type: 'object',
          required: ['currentRole'],
          properties: {
            currentRole: { type: 'string', example: 'Frontend Developer' },
            skills: {
              oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } }
              ],
              example: ['React', 'TypeScript', 'GraphQL']
            },
            interests: {
              oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } }
              ],
              example: ['System Design', 'Open Source']
            },
            education: { type: 'string', example: 'B.E. Computer Science, 2026' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['fail', 'error'] },
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js', './routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)
