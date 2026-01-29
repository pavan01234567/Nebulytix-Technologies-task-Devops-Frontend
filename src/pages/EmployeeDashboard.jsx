import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeProfile } from "../store/employeeSlice";
import AttendanceCard from "../components/AttendanceCard";
import WFHCard from "../components/WFHCard.jsx";
import ApplyLeaveCard from "../components/ApplyLeaveCard.jsx";
import axiosInstance from "../api/axiosInstance";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.employee);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=6366f1&color=fff&size=128&name=";


  // Fetch profile only once
  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axiosInstance.put(
        `/employee/${profile.id}/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.data) {
        dispatch(fetchEmployeeProfile());
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || "Failed to upload profile picture");
    } finally {
      setUploadLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2"></h1>

      {/* STATUS */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {uploadError && <p className="text-red-600 mb-4">{uploadError}</p>}

      {/* PROFILE */}
      {profile && (
        <>
          {/* PROFILE */}
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex gap-6 items-start">
              <div className="relative">
                <img
                  src={
                    profile.profilePictureUrl
                      ? profile.profilePictureUrl
                      : `${DEFAULT_AVATAR}${encodeURIComponent(profile.firstName + " " + profile.lastName)}`
                      }
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-shadow flex-shrink-0"
                />
                <button
                  onClick={handleProfilePictureClick}
                  disabled={uploadLoading}
                  className="absolute bottom-1 right-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                  title="Edit profile picture"
                >
                  {uploadLoading ? "..." : "✎"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploadLoading}
                />
              </div>
              {/* PROFILE DETAILS */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                <p><b>Name:</b> {profile.firstName} {profile.lastName}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Designation:</b> {profile.designation}</p>
                <p><b>Department:</b> {profile.department}</p>
                <p><b>Phone:</b> {profile.mobile}</p>
              </div>
            </div>
          </div>

          {/* ATTENDANCE */}
          
          <div className=" mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <AttendanceCard employeeId={profile.id} />
            <WFHCard employeeId={profile.id} />
            <ApplyLeaveCard employeeId={profile.id} />
          </div>
          
        </>
      )}

      {/* DAILY REPORT MODAL */}
      {showReport && (
        <DailyReportSubmit onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}
