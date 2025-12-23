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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="pl-3">
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
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-6">
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

        {/* Client Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Contact Person</span>
            <span className="text-gray-900">{client.contactPerson}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Email</span>
            <a
              href={`mailto:${client.contactEmail}`}
              className="text-blue-600 hover:underline"
            >
              {client.contactEmail}
            </a>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Phone</span>
            <span className="text-gray-900">{client.phone}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Alternate Phone</span>
            <span className="text-gray-900">
              {client.alternatePhone || "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Industry</span>
            <span className="text-gray-900">{client.industryType}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">GST Number</span>
            <span className="text-gray-900">{client.gstNumber || "-"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Website</span>
            {client.website ? (
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {client.website}
              </a>
            ) : (
              <span className="text-gray-900">-</span>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <span className="text-gray-500 font-medium">Address</span>
            <span className="text-gray-900">{client.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
