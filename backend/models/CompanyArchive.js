import mongoose from 'mongoose'

const companyArchiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ctc: { type: String, required: true },
  role: { type: String, required: true },
  tags: [{ type: String }],
  experiencesCount: { type: Number, default: 0 },
  pastPapersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.CompanyArchive || mongoose.model('CompanyArchive', companyArchiveSchema)
