import React from "react";

export default function JobCard({ job, onView }) {
  // Backend fields: jobTitle, domain, description, experienceLevel etc.
  const id = job.id ?? job._id ?? "unknown";
  const title = job.jobTitle || job.title || "Untitled Role";
  const description = job.description || job.desc || "No description provided.";
  const experience = job.experienceLevel || job.experience || "Not specified";
  const domain = job.domain || "Not specified";

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-sm text-gray-500">{domain}</div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {description}
          </p>

          <div className="text-xs text-gray-500 mt-3">
            <span className="mr-3">💼 {experience}</span>
            <span className="ml-3">ID: {id}</span>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onView}
            className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
            aria-label={`View ${title}`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
