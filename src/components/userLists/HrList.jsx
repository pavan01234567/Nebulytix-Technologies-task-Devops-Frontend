//src/components/userLists/HrList.jsx
import { useSelector } from "react-redux";
import HrCard from "./cards/HrCard";

export default function HrList() {
  const hrs = useSelector((s) => s.userLists.hrs);

  if (!hrs || hrs.length === 0) {
    return <p className="text-gray-500">No HRs found</p>;
  }

  return (
    <>
      {hrs.map((hr) => (
        <HrCard key={hr.id} hr={hr} />
      ))}
    </>
  );
}
