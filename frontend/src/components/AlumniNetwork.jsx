import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function AlumniNetwork() {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get('/api/alumni')
        setAlumni(res.data)
      } catch (err) {
        console.error('Error fetching alumni:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAlumni()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🤝 Alumni Network & Referrals</h1>
          <p className="text-gray-400">Connect with placed seniors, request referrals, and get interview tips.</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
          Become a Mentor
        </button>
      </motion.div>

      {loading ? (
        <div className="text-center py-10 text-white">Loading Alumni...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((alum, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={alum.id} 
              className="pro-3d-card p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-purple-500/30">
                {alum.img}
              </div>
              <h3 className="text-xl font-bold text-white">{alum.name}</h3>
              <p className="text-blue-400 font-medium mb-1">{alum.company}</p>
              <p className="text-gray-400 text-sm mb-4">{alum.role} • Batch of {alum.batch}</p>
              
              <div className="flex flex-col gap-2 w-full mt-auto">
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded font-medium transition-colors border border-gray-700">
                  Message 💬
                </button>
                <button className="w-full bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white py-2 rounded font-bold transition-colors">
                  Request Referral 📄
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
