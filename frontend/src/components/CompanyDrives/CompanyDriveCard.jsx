import React from 'react'
import { MapPin, Calendar, Briefcase, GraduationCap, DollarSign, ExternalLink, Info, CheckCircle2 } from 'lucide-react'

export default function CompanyDriveCard({ drive, onOpenDetails }) {
  const isWalkIn = drive.driveType === 'Walk-in Interview' || drive.venueDetails?.toLowerCase().includes('campus')

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              {drive.companyLogo ? (
                <img
                  src={drive.companyLogo}
                  alt={drive.companyName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.style.display = 'none'
                  }}
                />
              ) : null}
              <Briefcase className="w-6 h-6 text-cyan-400 font-bold" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                {drive.companyName}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {drive.driveTitle}
              </h3>
            </div>
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border shrink-0 ${
              isWalkIn
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}
          >
            {drive.driveType || 'Off-Campus'}
          </span>
        </div>

        {/* Badge & Role */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-md">
            {drive.badgeText || '🔥 Hiring Drive'}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {drive.ctcPackage || 'Best in Industry'}
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-2 text-xs text-slate-300 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">Role:</span>
            <span className="text-slate-200 font-medium truncate">{drive.role}</span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">Batches:</span>
            <div className="flex flex-wrap gap-1">
              {(drive.batchEligible || []).map((batch) => (
                <span key={batch} className="px-1.5 py-0.5 bg-slate-800 text-cyan-300 rounded font-semibold text-[10px]">
                  {batch}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">Location:</span>
            <span className="text-slate-200 font-medium truncate">{drive.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">Drive Date:</span>
            <span className="text-amber-300 font-semibold">{drive.walkinDate || 'Refer Notice'}</span>
            {drive.registrationEnd && (
              <span className="text-slate-500 text-[10px] ml-auto">
                (Apply by {drive.registrationEnd})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={() => onOpenDetails(drive)}
          className="flex-1 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          View Details
        </button>

        <a
          href={drive.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
        >
          Apply Now
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
