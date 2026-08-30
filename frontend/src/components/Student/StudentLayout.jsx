import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/student/dashboard' },
    { icon: '👤', label: 'My Profile', path: '/student/profile' },
    { icon: '📚', label: 'My Skills', path: '/student/skills' },
    { icon: '🏆', label: 'Achievements', path: '/student/achievements' },
    { icon: '📝', label: 'Notes Hub', path: '/student/notes' },
    { icon: '💼', label: 'Job Portal', path: '/student/jobs' },
    { icon: '🎤', label: 'Mock Interview', path: '/student/interview' },
    { icon: '📄', label: 'Resume Builder', path: '/student/resume' },
    { icon: '👥', label: 'Study Groups', path: '/student/groups' },
    { icon: '⭐', label: 'Leaderboard', path: '/student/leaderboard' },
    { icon: '🔔', label: 'Notifications', path: '/student/notifications' },
    { icon: '⚙️', label: 'Settings', path: '/student/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed md:relative z-50
        w-64 bg-gray-800 border-r border-gray-700
        transition-transform duration-300
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        h-full overflow-y-auto
      `}>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold text-white">🎓 CampusPilot</h1>
          <p className="text-xs text-gray-400">{user?.name || 'Student'}</p>
        </div>
        <nav className="p-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-900/30 transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="bg-gray-800 border-b border-gray-700 p-4 md:hidden">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="text-white text-2xl">☰</button>
            <h1 className="text-white font-bold">🎓 CampusPilot</h1>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
