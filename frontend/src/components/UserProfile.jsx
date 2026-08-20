import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function UserProfile() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    department: user?.department || '',
    semester: user?.semester || '',
    cgpa: user?.cgpa || '',
    github: user?.github || '',
    linkedin: user?.linkedin || ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      updateUser(formData)
      setLoading(false)
      toast.success('Profile updated successfully! 🎉')
    }, 800)
  }

  return (
    <div className="p-6">
      <div className="dark-box max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/30">
            {user?.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-blue-400">{user?.email}</p>
            <span className="inline-block mt-1 px-3 py-1 bg-gray-800 text-xs rounded-full border border-gray-700">
              {user?.role === 'admin' ? '👑 Administrator' : '🎓 Student'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
              <input 
                type="text" name="department" value={formData.department} onChange={handleChange}
                placeholder="e.g. Computer Science" className="dark-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Semester</label>
              <input 
                type="text" name="semester" value={formData.semester} onChange={handleChange}
                placeholder="e.g. 6th" className="dark-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Current CGPA</label>
              <input 
                type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange}
                placeholder="e.g. 8.5" className="dark-input w-full"
              />
            </div>
          </div>

          <hr className="border-gray-800 my-6" />
          <h3 className="text-lg font-bold text-white mb-4">Professional Links</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">GitHub Profile</label>
              <input 
                type="url" name="github" value={formData.github} onChange={handleChange}
                placeholder="https://github.com/..." className="dark-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn Profile</label>
              <input 
                type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                placeholder="https://linkedin.com/in/..." className="dark-input w-full"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Saving Changes...' : 'Save Profile Settings 💾'}
          </button>
        </form>
      </div>
    </div>
  )
}
