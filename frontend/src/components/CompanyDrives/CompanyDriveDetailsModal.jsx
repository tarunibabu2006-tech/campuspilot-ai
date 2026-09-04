import React from 'react'
import { X, MapPin, Calendar, Clock, Briefcase, GraduationCap, DollarSign, ExternalLink, CheckCircle2, ShieldCheck, Award } from 'lucide-react'

export default function CompanyDriveDetailsModal({ drive, onClose }) {
  if (!drive) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 p-2.5 flex items-center justify-center overflow-hidden shrink-0">
              <Briefcase className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {drive.companyName}
              </span>
              <h2 className="text-xl font-extrabold text-white">
                {drive.driveTitle}
              </h2>
              <p className="text-sm text-slate-400 font-medium">{drive.role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Package (CTC)</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {drive.ctcPackage}
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Drive Type</span>
              <span className="text-sm font-bold text-amber-400">
                {drive.driveType || 'Off-Campus'}
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 block mb-1">CGPA Criteria</span>
              <span className="text-sm font-bold text-cyan-300">
                {drive.cgpaCutoff || 'No Cutoff'}
              </span>
            </div>
          </div>

          {/* Venue & Time Details */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/20 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Venue & Schedule Information
            </h4>
            <p className="text-slate-200 font-medium leading-relaxed">
              {drive.venueDetails || 'Online Assessment Portal'}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Drive Date: <strong className="text-slate-200">{drive.walkinDate}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Reporting Time: <strong className="text-slate-200">{drive.walkinTime || '09:00 AM'}</strong>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Deadline: <strong className="text-rose-400">{drive.registrationEnd}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          {drive.description && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Drive Overview
              </h4>
              <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                {drive.description}
              </p>
            </div>
          )}

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Eligibility & Streams
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg font-semibold text-xs">
                Batches: {(drive.batchEligible || []).join(', ')}
              </span>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg font-semibold text-xs">
                Degrees: {(drive.degreeEligible || []).join(', ')}
              </span>
            </div>
          </div>

          {/* Selection Rounds */}
          {drive.roundsInfo && drive.roundsInfo.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Selection Process
              </h4>
              <div className="space-y-2">
                {drive.roundsInfo.map((round, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 font-medium">{round}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            Close Window
          </button>

          <a
            href={drive.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            Go to Registration Page
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
