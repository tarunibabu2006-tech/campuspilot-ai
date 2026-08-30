import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Hook to fetch student dashboard statistics.
 * Returns { data, loading, error } where data shape is:
 * { skillsLearned, jobsApplied, mockInterviews, xpPoints }
 */
export function useDashboardStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api
      .get('/student/dashboard')
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Dashboard API failed, using mock data', err);
          setData({ skillsLearned: 0, jobsApplied: 0, mockInterviews: 0, xpPoints: 0 });
          setLoading(false);
          setError(err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch recent activity for the logged‑in student.
 * Returns { data, loading, error } where data is an array of activity objects.
 */
export function useRecentActivity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api
      .get('/student/activity')
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Activity API failed, using mock data', err);
          const now = new Date();
          setData([
            { action: 'Daily Login Streak Verified', date: now, icon: '🔥', xp: '+10 XP' },
            { action: 'Accessed Notes Hub Curriculum', date: new Date(now - 3600000), icon: '📝', xp: '+15 XP' }
          ]);
          setLoading(false);
          setError(err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
