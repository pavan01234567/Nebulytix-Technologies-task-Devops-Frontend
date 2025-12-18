//src/components/userLists/ClientList.jsx
import { useSelector } from "react-redux";
import ClientCard from "./cards/ClientCard";

export default function ClientList() {
  const clients = useSelector((s) => s.userLists.clients);

  if (!clients || clients.length === 0) {
    return <p className="text-gray-500">No clients found</p>;
  }

  return (
    <>
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </>
  );
}
