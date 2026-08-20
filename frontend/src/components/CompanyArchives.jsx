import React, { useState } from 'react'

export default function CompanyArchives() {
  const [searchTerm, setSearchTerm] = useState('')

  const companies = [
    { id: 1, name: 'TCS Digital', ctc: '7.0 LPA', role: 'System Engineer', tags: ['Java', 'SQL', 'Aptitude'] },
    { id: 2, name: 'Zoho', ctc: '8.5 LPA', role: 'Member Technical Staff', tags: ['C/C++', 'DS & Algo', 'Advanced Programming'] },
    { id: 3, name: 'Amazon', ctc: '44.0 LPA', role: 'SDE-1', tags: ['System Design', 'Graphs', 'Dynamic Programming'] },
    { id: 4, name: 'Cognizant GenC Next', ctc: '6.75 LPA', role: 'Developer', tags: ['Python', 'DBMS', 'Logical'] }
  ]

  const filtered = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🏛️ Company Archives</h1>
          <p className="text-gray-400">Past placement papers, hiring patterns, and interview experiences.</p>
        </div>
        <input 
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dark-input w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
          <div key={company.id} className="dark-box hover:border-blue-500/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{company.name}</h3>
              <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded text-sm">{company.ctc}</span>
            </div>
            <p className="text-gray-300 mb-4 font-medium text-sm">Role: {company.role}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {company.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white py-2 rounded transition-colors text-center font-bold">
                Read Experiences
              </button>
              <button className="bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white py-2 rounded transition-colors text-center font-bold">
                View Past Papers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
