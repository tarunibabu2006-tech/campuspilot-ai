import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import logger from './logger.js'

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// In-memory vector store for demonstration (in production, use Pinecone or MongoDB Atlas Vector Search)
const vectorStore = new Map()

// Helper: Cosine Similarity between two vectors
const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export const generateEmbedding = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
    const result = await model.embedContent(text)
    return result.embedding.values
  } catch (error) {
    logger.error(`Embedding generation failed: ${error.message}`)
    return null
  }
}

export const addDocumentToVectorStore = async (userId, documentId, chunks) => {
  const namespace = `${userId}_${documentId}`
  const documentEmbeddings = []

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk)
    if (embedding) {
      documentEmbeddings.push({ text: chunk, embedding })
    }
  }

  vectorStore.set(namespace, documentEmbeddings)
  logger.info(`✅ Stored ${documentEmbeddings.length} vectorized chunks for document ${documentId}`)
  return namespace
}

export const searchSimilarChunks = async (namespace, query, topK = 3) => {
  const queryEmbedding = await generateEmbedding(query)
  if (!queryEmbedding) return []

  const documentEmbeddings = vectorStore.get(namespace)
  if (!documentEmbeddings) return []

  // Calculate similarities
  const results = documentEmbeddings.map(doc => ({
    text: doc.text,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }))

  // Sort by highest score (closest semantic meaning)
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, topK)
}
