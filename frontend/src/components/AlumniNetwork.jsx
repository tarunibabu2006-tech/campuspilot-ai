import React from 'react'

export default function AlumniNetwork() {
  const alumni = [
    { id: 1, name: 'Rahul Sharma', company: 'Amazon', role: 'SDE-1', batch: '2023', img: 'R' },
    { id: 2, name: 'Priya Patel', company: 'Microsoft', role: 'Software Engineer', batch: '2022', img: 'P' },
    { id: 3, name: 'Karthik N', company: 'Zoho', role: 'MTS', batch: '2024', img: 'K' },
    { id: 4, name: 'Sneha Reddy', company: 'TCS Digital', role: 'System Engineer', batch: '2024', img: 'S' }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🤝 Alumni Network & Referrals</h1>
          <p className="text-gray-400">Connect with placed seniors, request referrals, and get interview tips.</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
          Become a Mentor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alumni.map(alum => (
          <div key={alum.id} className="dark-box text-center hover:-translate-y-1 transition-transform">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-purple-500/30">
              {alum.img}
            </div>
            <h3 className="text-xl font-bold text-white">{alum.name}</h3>
            <p className="text-blue-400 font-medium mb-1">{alum.company}</p>
            <p className="text-gray-400 text-sm mb-4">{alum.role} • Batch of {alum.batch}</p>
            
            <div className="flex flex-col gap-2">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded font-medium transition-colors border border-gray-700">
                Message 💬
              </button>
              <button className="w-full bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white py-2 rounded font-bold transition-colors">
                Request Referral 📄
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
