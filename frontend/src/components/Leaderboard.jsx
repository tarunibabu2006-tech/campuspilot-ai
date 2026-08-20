import React from 'react'

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'S.Santhiya', score: 9850, badges: 12, dept: 'CSE' },
    { rank: 2, name: 'Rahul M', score: 9200, badges: 10, dept: 'IT' },
    { rank: 3, name: 'Anita K', score: 8950, badges: 9, dept: 'ECE' },
    { rank: 4, name: 'John Doe', score: 8100, badges: 7, dept: 'CSE' },
    { rank: 5, name: 'Priya S', score: 7800, badges: 6, dept: 'MECH' }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 drop-shadow-lg">
          🏆 College Hall of Fame
        </h1>
        <p className="text-gray-400 text-lg">Top performers based on Mock Tests, AI Interviews, and Skill Badges.</p>
      </div>

      <div className="dark-box overflow-hidden p-0 border-0 shadow-2xl shadow-yellow-500/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/80 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold text-center w-20">Rank</th>
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 font-semibold text-center">Badges</th>
                <th className="p-4 font-semibold text-right">Total Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leaders.map((student, idx) => (
                <tr 
                  key={student.name} 
                  className={`hover:bg-gray-800/40 transition-colors ${idx < 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''}`}
                >
                  <td className="p-4 text-center">
                    {idx === 0 ? <span className="text-2xl" title="Gold">🥇</span> : 
                     idx === 1 ? <span className="text-2xl" title="Silver">🥈</span> : 
                     idx === 2 ? <span className="text-2xl" title="Bronze">🥉</span> : 
                     <span className="text-gray-500 font-bold">#{student.rank}</span>}
                  </td>
                  <td className="p-4 text-white font-bold text-lg">{student.name}</td>
                  <td className="p-4 text-gray-400">{student.dept}</td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-800/50">
                      {student.badges} 🏅
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-green-400 font-extrabold text-xl">{student.score.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
