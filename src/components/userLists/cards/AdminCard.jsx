//src/components/userLists/cards/AdminCard.jsx
export default function AdminCard({ admin }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow space-y-2">
      <h3 className="text-lg font-semibold">{admin.email}</h3>

      <p className="text-sm text-gray-600">
        Status: {admin.enabled ? "Active" : "Disabled"}
      </p>

      <div className="flex gap-3 pt-2">
        <button className="text-blue-600 text-sm">View</button>
        <button className="text-green-600 text-sm">Update</button>
        <button className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
