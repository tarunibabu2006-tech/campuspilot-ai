import mongoose from 'mongoose'

const companyDriveSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  driveTitle: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  driveType: {
    type: String,
    enum: ['Walk-in Interview', 'Off-Campus Drive', 'Virtual Hiring', 'Hackathon Hiring'],
    default: 'Off-Campus Drive',
    index: true
  },
  batchEligible: [{
    type: String,
    trim: true,
    index: true // e.g. ['2024', '2025', '2026', '2027']
  }],
  degreeEligible: [{
    type: String,
    trim: true // e.g. ['B.E', 'B.Tech', 'B.Sc', 'BCA', 'M.Tech', 'MCA', 'Any Degree']
  }],
  cgpaCutoff: {
    type: String,
    default: 'No Minimum Criteria'
  },
  ctcPackage: {
    type: String,
    required: true // e.g. '3.36 LPA - 9.0 LPA'
  },
  location: {
    type: String,
    required: true // e.g. 'Chennai', 'Bangalore', 'Pan-India Remote'
  },
  venueDetails: {
    type: String,
    default: 'Online Assessment / Venue shared upon registration'
  },
  walkinDate: {
    type: String,
    default: '' // e.g. '2026-03-25'
  },
  walkinTime: {
    type: String,
    default: '09:00 AM IST'
  },
  registrationEnd: {
    type: String,
    required: true // e.g. '2026-03-20'
  },
  applyLink: {
    type: String,
    required: true
  },
  officialNoticeUrl: {
    type: String,
    default: ''
  },
  roundsInfo: [{
    type: String // e.g. ['Online Aptitude & Coding', 'Technical Interview', 'HR Interview']
  }],
  badgeText: {
    type: String,
    default: '🔥 Mass Hiring'
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'upcoming', 'completed'],
    default: 'active',
    index: true
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

companyDriveSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

const CompanyDrive = mongoose.models.CompanyDrive || mongoose.model('CompanyDrive', companyDriveSchema)
export default CompanyDrive
