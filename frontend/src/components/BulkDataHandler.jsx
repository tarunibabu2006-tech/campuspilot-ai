import React, { useState } from 'react'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

export default function BulkDataHandler({ 
  title = "Data Management",
  onImport = (data) => console.log('Imported:', data),
  exportData = [],
  exportFilename = "export.csv",
  templateData = [{ name: 'Example', value: 123 }],
  className = ""
}) {
  const [loading, setLoading] = useState(false)

  // Handle Export
  const handleExport = () => {
    if (!exportData || exportData.length === 0) {
      alert("No data available to export!")
      return
    }
    const csv = Papa.unparse(exportData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, exportFilename)
  }

  // Handle Download Template
  const handleDownloadTemplate = () => {
    const csv = Papa.unparse(templateData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `template_${exportFilename}`)
  }

  // Handle Import
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setLoading(false)
        if (results.errors.length > 0) {
          alert('Error parsing CSV. Please check the format.')
          console.error(results.errors)
        } else {
          onImport(results.data)
          e.target.value = null // reset input
        }
      }
    })
  }

  return (
    <div className={`pro-3d-card p-6 mb-6 ${className}`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Export Button */}
        <button 
          onClick={handleExport}
          className="btn-3d"
        >
          📦 Export CSV
        </button>

        {/* Import Button */}
        <div className="relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="csv-upload"
          />
          <button className="btn-3d" style={{ background: 'var(--gradient-success)' }}>
            {loading ? '⏳ Processing...' : '📥 Import CSV'}
          </button>
        </div>

        {/* Template Download */}
        <button 
          onClick={handleDownloadTemplate}
          className="btn-outline px-4 py-2 rounded-md text-sm ml-auto"
        >
          📄 Download Template
        </button>
      </div>
    </div>
  )
}
