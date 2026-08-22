import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function CompanyArchives() {
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const res = await axios.get('/api/company-archives')
        setCompanies(res.data)
      } catch (err) {
        console.error('Error fetching archives:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArchives()
  }, [])

  const filtered = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">🏛️ Company Archives & Past Papers</h1>
        <p className="text-gray-400 mb-6">Explore historical placement data, expected CTCs, and previously asked interview questions.</p>
        
        <input 
          type="text" 
          placeholder="🔍 Search companies (e.g. Zoho, Amazon)..." 
          className="w-full max-w-xl bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {loading ? (
        <div className="text-center py-10 text-white">Loading Archives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={company.id || company._id} 
              className="pro-3d-card p-6 border-t-4 border-t-blue-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{company.name}</h3>
                <span className="bg-green-600/20 text-green-400 font-bold px-3 py-1 rounded-full text-sm">
                  {company.ctc}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{company.role}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {company.tags.map(tag => (
                  <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between border-t border-gray-700 pt-4 text-sm text-gray-400">
                <span>📝 {company.experiencesCount || 0} Interview Experiences</span>
                <span>📄 {company.pastPapersCount || 0} Past Papers</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
