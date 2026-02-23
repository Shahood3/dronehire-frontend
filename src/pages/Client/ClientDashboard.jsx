import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import jobsService from '../../services/jobsService';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    hiredPilots: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await jobsService.getMyJobs();
      setJobs(data.jobs || []);

      const activeJobs        = data.jobs?.filter(j => j.status === 'open').length || 0;
      const totalApplications = data.jobs?.reduce((acc, j) => acc + (j.applications?.length || 0), 0) || 0;
      const hiredPilots       = data.jobs?.reduce((acc, j) => acc + (j.hiredPilots?.length   || 0), 0) || 0;

      setStats({ activeJobs, totalApplications, hiredPilots });
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to load jobs');
      if (err.status === 401) { logout(); navigate('/login'); }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      open:        'bg-green-100 text-green-700 border-green-200',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
      completed:   'bg-gray-100 text-gray-600 border-gray-200',
      cancelled:   'bg-red-100 text-red-700 border-red-200',
    };
    return styles[status] || styles.open;
  };

  return (
    /* pt-16 offsets the fixed navbar */
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your drone projects</p>
          </div>
          <button
            onClick={() => navigate('/client/post-job')}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-sm shadow-teal-500/20 transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 flex-1 text-sm">{error}</p>
            <button
              onClick={fetchJobs}
              className="px-3 py-1 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { label: 'Active Jobs',         value: stats.activeJobs        },
            { label: 'Total Applications',  value: stats.totalApplications },
            { label: 'Hired Pilots',        value: stats.hiredPilots       },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-teal-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Jobs section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Your Jobs</h2>
            <button
              onClick={() => navigate('/client/post-job')}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading your jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium mb-1">No jobs posted yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Post your first job to start receiving applications from professional drone pilots!
              </p>
              <button
                onClick={() => navigate('/client/post-job')}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-sm transition-all duration-200 text-sm"
              >
                + Post New Job
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-gray-800">{job.title}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(job.status)}`}>
                          {job.status?.replace('_', ' ').toUpperCase() || 'OPEN'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ₹{job.budget?.toLocaleString()} ({job.budgetType})
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(job.startDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-teal-600 font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {job.applications?.length || 0} Applications
                        </span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-2">
              {jobs.slice(0, 5).map((job) => (
                <div key={job._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 text-sm">
                      You posted a new job:{' '}
                      <span className="text-gray-900 font-medium">{job.title}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(job.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;