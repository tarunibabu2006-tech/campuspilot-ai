// Seeds the real Notes Hub catalog: every (topic × level × unit) combination from the
// real curriculum taxonomy in frontend/src/data/notesEngine.js becomes a catalog entry —
// title, category, subject, level, unit only. No content, ratings, or download counts
// are written here; a topic's actual content is written for real by Gemini the first
// time a student opens it (see routes/notesHub.js GET /:id), and cached from then on.
//
// This is a one-time, no-API-cost operation (~18,000 documents from real curriculum
// data, just DB writes) — safe to run repeatedly, it skips topics that already exist.
//
// Usage: node scripts/seedNoteCatalog.js   (or: npm run seed:notes)

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Note from '../models/Note.js'
import { NOTE_TAXONOMY } from '../../frontend/src/data/notesEngine.js'

dotenv.config()

const BATCH_SIZE = 1000

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuspilot'
  await mongoose.connect(uri)
  console.log('Connected to MongoDB. Building catalog from NOTE_TAXONOMY...')

  const existingTitles = new Set(
    (await Note.find({ generated: false }).select('title subject category level').lean())
      .map(n => `${n.title}|${n.subject}|${n.category}|${n.level}`)
  )

  const docs = []
  for (const [category, catData] of Object.entries(NOTE_TAXONOMY)) {
    for (const [subject, subjectData] of Object.entries(catData.subjects)) {
      const units = subjectData.units || []
      for (const topic of subjectData.topics) {
        for (const level of subjectData.levels) {
          for (const unit of units) {
            const title = `${topic} — ${level} Notes`
            const key = `${title}|${subject}|${category}|${level}`
            if (existingTitles.has(key)) continue
            existingTitles.add(key)
            docs.push({ title, category, subject, level, unit, generated: false })
          }
        }
      }
    }
  }

  console.log(`Prepared ${docs.length} new topics to insert (existing entries skipped).`)

  let inserted = 0
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = docs.slice(i, i + BATCH_SIZE)
    try {
      await Note.insertMany(batch, { ordered: false })
      inserted += batch.length
    } catch (err) {
      // Duplicate-key errors from the unique index are expected/harmless on reruns.
      if (!/duplicate key/i.test(err.message)) console.error(`Insert batch error: ${err.message}`)
    }
    console.log(`  + ${Math.min(i + BATCH_SIZE, docs.length)}/${docs.length}`)
  }

  const total = await Note.countDocuments({})
  console.log(`\nDone. Inserted ~${inserted} new topics. Catalog now has ${total} topics total.`)
  await mongoose.disconnect()
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
