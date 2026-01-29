import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectById,
  deleteProject,
  updateProjectStatus,
  removeEmployeeFromProject,
} from "../../../store/projectSlice";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProject, loading } = useSelector((state) => state.project);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [dispatch, projectId]);

  const handleStatusUpdate = () => {
    if (!status || !selectedProject) return;
    dispatch(updateProjectStatus({ projectId: selectedProject.id, status }));
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    if (!window.confirm("Delete this project permanently?")) return;
    dispatch(deleteProject(selectedProject.id));
    navigate("/admin/projects");
  };

  const handleRemoveEmployee = (empId) => {
    if (!selectedProject) return;
    dispatch(
      removeEmployeeFromProject({
        projectId: selectedProject.id,
        employeeId: empId,
      })
    );
  };

  // ===== Loading / Not Found States =====
  if (loading) {
    return <p style={styles.loading}>Loading project details...</p>;
  }

  if (!selectedProject) {
    return <p style={styles.loading}>Project not found.</p>;
  }

  // ===== Safe employees array =====
  const employees = Array.isArray(selectedProject.employees)
    ? selectedProject.employees
    : [];

  // ===== Safe project status =====
  const projectStatus =
    selectedProject.status ? selectedProject.status.replace("_", " ") : "—";

  return (
    <div style={styles.container}>
      {/* Back button */}
      <button style={styles.backBtn} onClick={() => navigate("/admin/projects")}>
        ← Back to Projects
      </button>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{selectedProject.projectName || "—"}</h1>
          <p style={styles.subtitle}>
            Client: {selectedProject.client?.companyName || "No Client"}
          </p>
        </div>
        <button style={styles.dangerBtn} onClick={handleDelete}>
          Delete Project
        </button>
      </div>

      {/* Cards Section */}
      <div style={styles.cardsGrid}>
        <Card title="Project Information">
          <InfoRow label="Project Name" value={selectedProject.projectName || "—"} />
          <InfoRow label="Status" value={projectStatus} />
          <InfoRow label="Total Employees" value={employees.length} />
        </Card>

        <Card title="Client Information">
          <InfoRow label="Name" value={selectedProject.client?.companyName || "—"} />
          <InfoRow label="Email" value={selectedProject.client?.contactEmail || "—"} />
          <InfoRow label="Phone" value={selectedProject.client?.phone || "—"} />
        </Card>

        <Card title="Update Status">
          <div style={styles.statusUpdate}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Status</option>
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button style={styles.primaryBtn} onClick={handleStatusUpdate}>
              Update
            </button>
          </div>
        </Card>
      </div>

      {/* Assigned Employees */}
      <div style={styles.employeesSection}>
        <h2 style={styles.sectionTitle}>Assigned Employees</h2>

        {employees.length === 0 ? (
          <p style={styles.muted}>No employees assigned.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} style={styles.tr}>
                  <td style={styles.td}>{emp.firstName} {emp.lastName}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.designation || "—"}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.removeBtn}
                      onClick={() => handleRemoveEmployee(emp.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ===== Components ===== */
function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={styles.infoValue}>{value || "—"}</span>
    </div>
  );
}

/* ===== Styles ===== */
const styles = {
  container: {
    padding: "32px",
    fontFamily: "Inter, sans-serif",
    background: "#f4f5f7",
    minHeight: "100vh",
  },
  loading: { padding: "32px", fontSize: "16px", color: "#6b7280" },
  backBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "32px",
  },
  title: { fontSize: "28px", fontWeight: 700, margin: 0, color: "#111827" },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
  dangerBtn: {
    padding: "8px 16px",
    background: "#b91c1c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#111827",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  infoLabel: { fontSize: "13px", color: "#6b7280", fontWeight: 500 },
  infoValue: { fontSize: "14px", fontWeight: 600, color: "#111827" },
  statusUpdate: { display: "flex", gap: "12px", alignItems: "center" },
  select: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  primaryBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  employeesSection: { marginTop: "32px" },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "16px",
    color: "#111827",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 6px",
    marginTop: "16px",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#334155",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#475569",
    verticalAlign: "middle",
    maxWidth: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tr: { background: "#f9fafb", transition: "background 0.2s" },
  removeBtn: {
    padding: "4px 10px",
    background: "#fff",
    border: "1px solid #b91c1c",
    color: "#b91c1c",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  muted: { fontSize: "14px", color: "#6b7280" },
};
