//src/components/userLists/ManagerList.jsx
import { useSelector } from "react-redux";
import ManagerCard from "./cards/ManagerCard";

export default function ManagerList() {
  const managers = useSelector((s) => s.userLists.managers);

  if (!managers || managers.length === 0) {
    return <p className="text-gray-500">No managers found</p>;
  }

  return (
    <>
      {managers.map((m) => (
        <ManagerCard key={m.id} manager={m} />
      ))}
    </>
  );
}
