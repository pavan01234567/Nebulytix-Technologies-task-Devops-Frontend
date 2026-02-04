import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProjects } from "../../../store/projectSlice";

export default function ProjectListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProjects, loading } = useSelector((state) => state.project);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL"); // Filter state

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const filteredProjects = allProjects
    .filter((project) => {
      const projectName = project.projectName.toLowerCase();
      const clientName = project.client?.companyName?.toLowerCase() || "";
      const query = search.toLowerCase();
      return projectName.includes(query) || clientName.includes(query);
    })
    .filter((project) => {
      if (filterStatus === "ALL") return true;
      return project.status === filterStatus;
    });

  const openProject = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  // ===== Dashboard Stats =====
  const totalProjects = allProjects.length;
  const plannedCount = allProjects.filter((p) => p.status === "PLANNED").length;
  const inProgressCount = allProjects.filter((p) => p.status === "IN_PROGRESS").length;
  const completedCount = allProjects.filter((p) => p.status === "COMPLETED").length;

  return (
    <div style={styles.container}>
      {/* ===== Header / Stats ===== */}
      <div style={styles.header}>
        <h1 style={styles.title}>Projects</h1>

        <div style={styles.statsRow}>
          <StatCard label="Total Projects" value={totalProjects} color="#374151" />
          <StatCard label="Planned" value={plannedCount} color="#6b7280" />
          <StatCard label="In Progress" value={inProgressCount} color="#2563eb" />
          <StatCard label="Completed" value={completedCount} color="#047857" />
        </div>

        {/* ===== Search + Filters ===== */}
        <div style={styles.searchFilterRow}>
          <input
            type="text"
            placeholder="Search projects by name or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="ALL">All Statuses</option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {loading && <p style={styles.muted}>Loading projects...</p>}

      {/* ===== Project Grid ===== */}
      <div style={styles.grid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              style={styles.card}
              onClick={() => openProject(project.id)}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.projectName}>{project.projectName}</h3>
                <span style={{ ...styles.statusBadge, ...statusColor(project.status) }}>
                  {project.status.replace("_", " ")}
                </span>
              </div>
              <p style={styles.clientName}>
                Client: {project.client?.companyName || "No Client Assigned"}
              </p>
            </div>
          ))
        ) : (
          !loading && <p style={styles.muted}>No projects found.</p>
        )}
      </div>
    </div>
  );
}

/* ===== Stat Card Component ===== */
function StatCard({ label, value, color }) {
  return (
    <div style={{ ...styles.statCard, borderColor: color }}>
      <p style={{ ...styles.statLabel, color }}>{label}</p>
      <h2 style={{ ...styles.statValue, color }}>{value}</h2>
    </div>
  );
}

/* ===== Status Color Mapping (Corporate Palette) ===== */
const statusColor = (status) => {
  switch (status) {
    case "PLANNED":
      return { background: "#f3f4f6", color: "#374151" }; // Slate Gray
    case "IN_PROGRESS":
      return { background: "#e0f2fe", color: "#0369a1" }; // Soft Blue
    case "COMPLETED":
      return { background: "#d1fae5", color: "#065f46" }; // Deep Green
    default:
      return { background: "#f9fafb", color: "#6b7280" }; // Neutral
  }
};

/* ===== Styles ===== */
const styles = {
  container: {
    padding: "32px",
    fontFamily: "'Inter', sans-serif",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  header: { marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: 700, marginBottom: "20px", color: "#111827" },
  statsRow: { display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" },
  statCard: {
    flex: "1 1 140px",
    background: "#fff",
    borderRadius: "12px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    borderTop: "4px solid",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  statLabel: { fontSize: "13px", fontWeight: 500, marginBottom: "6px" },
  statValue: { fontSize: "22px", fontWeight: 700 },
  searchFilterRow: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  filterSelect: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  projectName: { fontSize: "16px", fontWeight: 600, margin: 0, color: "#111827" },
  clientName: { fontSize: "14px", color: "#6b7280", margin: 0 },
  statusBadge: {
    fontSize: "12px",
    fontWeight: 600,
    padding: "5px 12px",
    borderRadius: "12px",
    textTransform: "uppercase",
  },
  muted: { fontSize: "14px", color: "#9ca3af", textAlign: "center", marginTop: "20px" },
};
