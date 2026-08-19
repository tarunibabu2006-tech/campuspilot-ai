import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdBy: { type: String, default: 'Student' },
  members: [{
    id: { type: String },
    name: { type: String },
    email: { type: String }
  }],
  notes: [{
    title: { type: String },
    content: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  messages: [{
    sender: { type: String },
    senderName: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema)
export default Group
