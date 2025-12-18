//src/components/userLists/AdminList.jsx
import { useSelector } from "react-redux";
import AdminCard from "./cards/AdminCard";

export default function AdminList() {
  const admins = useSelector((s) => s.userLists.admins);

  if (!admins || admins.length === 0) {
    return <p className="text-gray-500">No admins found</p>;
  }

  return (
    <>
      {admins.map((admin) => (
        <AdminCard key={admin.id} admin={admin} />
      ))}
    </>
  );
}
