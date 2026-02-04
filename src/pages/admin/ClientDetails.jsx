// src/pages/admin/ClientDetails.jsx
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientActionTabs from "./ClientActionTabs";

export default function ClientDetails() {
  const { clientId } = useParams();

  const client = useSelector((s) =>
    s.userLists.clients.find((c) => String(c.id) === String(clientId))
  );

  if (!client) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg italic">Client not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= ACTION NAV BAR ================= */}
      <ClientActionTabs />

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-10 pl-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {client.companyName}
          </h1>
          <p className="text-gray-500">Client ID: {client.id}</p>
        </div>

        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Active
        </span>
      </div>

      {/* ================= CLIENT DETAILS CARD ================= */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-6 ml-6">
        {/* Header + Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Client Information
          </h2>

          <div className="flex gap-3">
            <NavLink
              to={`/clients/${client.id}/edit`}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              Edit Client
            </NavLink>

            <NavLink
              to={`/clients/${client.id}/delete`}
              className="px-4 py-2 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              Delete Client
            </NavLink>
          </div>
        </div>

        {/* ================= CLIENT INFO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Contact Person" value={client.contactPerson} />
          <Info
            label="Email"
            value={
              <a
                href={`mailto:${client.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {client.contactEmail}
              </a>
            }
          />
          <Info label="Phone" value={client.phone} />
          <Info
            label="Alternate Phone"
            value={client.alternatePhone || "-"}
          />
          <Info label="Industry" value={client.industryType} />
          <Info label="GST Number" value={client.gstNumber || "-"} />
          <Info
            label="Website"
            value={
              client.website ? (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {client.website}
                </a>
              ) : (
                "-"
              )
            }
          />
          <div className="md:col-span-2">
            <Info label="Address" value={client.address} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INFO COMPONENT ================= */
function Info({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-900 break-words">{value}</span>
    </div>
  );
}