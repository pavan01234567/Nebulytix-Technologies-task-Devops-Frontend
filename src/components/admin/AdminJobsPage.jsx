// src/components/admin/AdminJobsPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../store/jobSlice";
import { useNavigate } from "react-router-dom";

export default function AdminJobsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((s) => s.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  const jobList = Array.isArray(jobs) ? jobs : [];
  const activeJobs = jobList.filter(j => j.isActive).length;

  const handleJobClick = (jobId) => {
    navigate(`/admin/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-200 border-t-indigo-600"></div>
            <p className="text-gray-600 text-sm font-medium">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-900 font-semibold mb-1">Unable to Load Jobs</h3>
          <p className="text-red-700 text-sm">{error.message || "An error occurred while loading jobs"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
        <p className="text-gray-600 text-sm mt-1">Manage and review all job listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{jobList.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium">Active Postings</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeJobs}</p>
        </div>
      </div>

      {/* Jobs Table/List */}
      {jobList.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 font-medium">No jobs found</p>
          <p className="text-gray-500 text-sm mt-1">Start by creating a new job posting</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
            <div className="col-span-4">Job Title</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {jobList.map((job, index) => (
              <div key={job.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center text-sm">
                {/* Title */}
                <div className="col-span-4">
                  <p className="font-semibold text-gray-900">{job.jobTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.domain}</p>
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <p className="text-gray-700">{job.location || '-'}</p>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {job.jobType || 'N/A'}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    job.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2">
                  <button
                    onClick={() => handleJobClick(job.id)}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition border border-indigo-200"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      {jobList.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{jobList.length}</span> job{jobList.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}