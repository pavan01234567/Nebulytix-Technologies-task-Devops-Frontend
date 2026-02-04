// src/components/admin/AdminJobDetailPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
 import { fetchJobById } from "../store/jobSlice";

export default function AdminJobDetailPage() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedJob, loading, error } = useSelector((s) => s.jobs);

  useEffect(() => {
    dispatch(fetchJobById(jobId));
  }, [dispatch, jobId]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 text-sm">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 mb-4"
        >
          ← Back
        </button>
        <div className="bg-red-50 border border-red-200 rounded p-4 text-sm">
          <p className="text-red-700 font-medium">{error.message || "Error loading job details"}</p>
        </div>
      </div>
    );
  }

  if (!selectedJob) return null;

  const jobStatus = selectedJob.isActive ? "Active" : "Inactive";
  const statusColor = selectedJob.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedJob.jobTitle}</h1>
          {selectedJob.location && (
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              📍 {selectedJob.location}
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded text-xs font-semibold ${statusColor} whitespace-nowrap mt-1`}>
          {jobStatus}
        </span>
      </div>

      {/* Quick Info Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 pb-6 border-b border-gray-200">
        {selectedJob.domain && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-semibold">Domain</p>
            <p className="text-sm text-gray-900 mt-1">{selectedJob.domain}</p>
          </div>
        )}
        {selectedJob.jobType && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-semibold">Type</p>
            <p className="text-sm text-gray-900 mt-1">{selectedJob.jobType}</p>
          </div>
        )}
        {selectedJob.experienceLevel && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-semibold">Experience</p>
            <p className="text-sm text-gray-900 mt-1">{selectedJob.experienceLevel}</p>
          </div>
        )}
        {selectedJob.salaryRange && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-semibold">Salary</p>
            <p className="text-sm text-gray-900 mt-1">{selectedJob.salaryRange}</p>
          </div>
        )}
      </div>

      {/* Dates Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
        {selectedJob.postedDate && (
          <div>
            <p className="text-xs text-gray-600 font-semibold mb-1">Posted Date</p>
            <p className="text-sm text-gray-900">{new Date(selectedJob.postedDate).toLocaleDateString()}</p>
          </div>
        )}
        {selectedJob.closingDate && (
          <div>
            <p className="text-xs text-gray-600 font-semibold mb-1">Closing Date</p>
            <p className="text-sm text-gray-900">{new Date(selectedJob.closingDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="space-y-5">
        {selectedJob.description && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedJob.description}
            </p>
          </div>
        )}

        {selectedJob.requirements && (
          <div className="pt-5 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Requirements</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedJob.requirements}
            </p>
          </div>
        )}

        {selectedJob.responsibilities && (
          <div className="pt-5 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Responsibilities</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedJob.responsibilities}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex gap-2 justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}