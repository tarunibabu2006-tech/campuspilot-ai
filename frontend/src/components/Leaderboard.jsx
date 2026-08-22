import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/gamification/leaderboard')
        setLeaders(res.data)
      } catch (err) {
        console.error('Error fetching leaderboard:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pro-3d-card p-8 text-center mb-8 border-t-4 border-t-yellow-500"
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
          🏆 College Hall of Fame
        </h1>
        <p className="text-gray-300">Top performers based on skills, mock tests, and platform engagement.</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-10 text-white">Loading Leaderboard...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {leaders.map((student, index) => {
            const isTop3 = index < 3;
            const rankColors = ['from-yellow-400 to-yellow-600', 'from-gray-300 to-gray-500', 'from-yellow-700 to-orange-800'];
            const badgeColor = isTop3 ? rankColors[index] : 'from-blue-500 to-purple-600';

            return (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className={`pro-3d-card flex items-center justify-between p-4 px-6 ${isTop3 ? 'border border-yellow-500/30' : ''}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${badgeColor} shadow-lg`}>
                    #{student.rank}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {student.name} {index === 0 && '👑'}
                    </h3>
                    <p className="text-gray-400 text-sm">Department: {student.dept}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {student.score} XP
                  </div>
                  <p className="text-sm text-gray-400">🎖️ {student.badges} Badges</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
