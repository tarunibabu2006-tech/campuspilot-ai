import React, { useState } from 'react'
import { calculateBunks } from '../services/api'
import toast from 'react-hot-toast'

function BunkPlanner({ language }) {
  const [totalClasses, setTotalClasses] = useState('60')
  const [attended, setAttended] = useState('48')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    if (!totalClasses || !attended) {
      toast.error('Please enter total and attended classes!')
      return
    }
    const tot = parseInt(totalClasses)
    const att = parseInt(attended)

    if (att > tot) {
      toast.error('Attended classes cannot exceed total classes!')
      return
    }

    setLoading(true)
    try {
      const res = await calculateBunks({ totalClasses: tot, attended: att, language })
      setResult(res.data)
      toast.success('Attendance analyzed! 🏃')
    } catch (err) {
      toast.error('Failed to calculate')
    }
    setLoading(false)
  }

  const currentPct = totalClasses && attended
    ? ((parseInt(attended) / parseInt(totalClasses)) * 100).toFixed(1)
    : 0

  return (
    <div className="card">
      <h2 className="card-title">🏃 Safe Bunks Planner</h2>
      <p className="card-subtitle">Calculate attendance percentage, safe bunks left before hitting the 75% cutoff, and recovery plans!</p>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Total Classes Conducted</label>
          <input
            type="number"
            className="form-input"
            value={totalClasses}
            onChange={e => setTotalClasses(e.target.value)}
            placeholder="e.g., 60"
            min="1"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Classes Attended</label>
          <input
            type="number"
            className="form-input"
            value={attended}
            onChange={e => setAttended(e.target.value)}
            placeholder="e.g., 48"
            min="0"
          />
        </div>
      </div>

      {totalClasses > 0 && attended >= 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Current Attendance: <strong>{currentPct}%</strong></span>
            <span>Target: <strong>75.0%</strong></span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${currentPct >= 75 ? 'safe' : 'danger'}`}
              style={{ width: `${Math.min(100, currentPct)}%` }}
            ></div>
          </div>
        </div>
      )}

      <button onClick={handleCalculate} disabled={loading} className="btn btn-primary btn-full">
        {loading ? <><span className="loading-spinner"></span> Calculating...</> : '📊 Calculate Bunk Plan'}
      </button>

      {result && (
        <div className="result-section">
          <div className="flex justify-between items-center mb-1">
            <h3 className="result-title" style={{ marginBottom: 0 }}>📊 Attendance Status</h3>
            <span className={`badge badge-${result.status?.includes('Safe') ? 'safe' : 'danger'}`} style={{ fontSize: '0.85rem' }}>
              {result.status}
            </span>
          </div>

          <div className="stats-grid mt-2">
            <div className="stat-card">
              <div className="stat-value">{result.currentPercentage}%</div>
              <div className="stat-label">Percentage</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.canBunkTotal || 0}</div>
              <div className="stat-label">Safe Bunks Left</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">75%</div>
              <div className="stat-label">Min Threshold</div>
            </div>
          </div>

          {result.message && (
            <div className="mb-2" style={{ padding: '0.75rem', background: result.status?.includes('Safe') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm">{result.message}</p>
            </div>
          )}

          {result.weeklyPlan && (
            <div className="mb-2">
              <p className="text-sm font-bold mb-1">🗓️ Weekly Bunk Strategy:</p>
              <div className="result-item">
                <div>
                  <p className="text-sm">Max recommended bunks per week: <strong>{result.weeklyPlan.maxBunksPerWeek}</strong></p>
                  {result.weeklyPlan.safeDays && (
                    <p className="text-xs text-muted mt-1">Suggested safe days: {result.weeklyPlan.safeDays.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {result.recoveryPlan && (
            <div className="mt-2" style={{ padding: '0.8rem', background: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-md)' }}>
              <p className="text-sm font-bold text-red">🚨 Attendance Recovery Plan:</p>
              <div className="stats-grid mt-1">
                <div className="stat-card">
                  <div className="stat-value text-red">{result.recoveryPlan.classesToAttend}</div>
                  <div className="stat-label">Must Attend</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value text-orange">{result.recoveryPlan.dailyTarget || 4}</div>
                  <div className="stat-label">Classes/Day</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value text-blue">{result.recoveryPlan.weeksNeeded || 2}</div>
                  <div className="stat-label">Weeks Needed</div>
                </div>
              </div>
              {result.recoveryPlan.strategy && (
                <p className="text-xs text-muted mt-1">💡 Strategy: {result.recoveryPlan.strategy}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BunkPlanner
