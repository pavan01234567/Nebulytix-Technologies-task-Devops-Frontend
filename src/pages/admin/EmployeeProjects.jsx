import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";
import {
  fetchEmployeeProjects,
  fetchAllProjects,
  assignProjectToEmployee,
  clearProjectStatus,
} from "../../store/employeeProjectSlice";

export default function EmployeeProjects() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("");

  const { oldProjects, allProjects, success, loading } =
    useSelector((s) => s.employeeProject);

  useEffect(() => {
    dispatch(fetchEmployeeProjects(employeeId));   // ✅ only fetch old projects
  }, [employeeId, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(fetchEmployeeProjects(employeeId));
      dispatch(clearProjectStatus());
    }
  }, [success, employeeId, dispatch]);

  const handleAssign = () => {
    if (!selectedProject) return alert("Select project");
    dispatch(
      assignProjectToEmployee({ projectId: selectedProject, employeeId })
    );
  };

  return (
    <div className="space-y-6">
      <EmployeeActionTabs />

      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Projects</h2>

        {/* ASSIGN PROJECT */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <button
            onClick={() => dispatch(fetchAllProjects())}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Assign Project
          </button>

          {allProjects.length > 0 && (
            <div className="flex gap-3">
              <select
                className="input-base"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select project</option>
                {allProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.projectName} ({p.projectCode})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAssign}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Assign
              </button>
            </div>
          )}
        </div>

        {/* OLD PROJECTS */}
        {oldProjects.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Employee Projects</h4>
            <div className="space-y-3">
              {oldProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold">{project.projectName}</h3>
      <p className="text-sm text-gray-600">{project.projectCode}</p>
      <p className="text-sm">Status: {project.status}</p>
    </div>
  );
}
