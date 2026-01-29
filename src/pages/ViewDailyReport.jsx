// src/pages/ViewDailyReport.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "../api/config";
import { FileText, Download, RefreshCw, AlertCircle } from "lucide-react";

export default function ViewDailyReport() {
  const [reportUrl, setReportUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  /* ============================
     Always Fetch Latest Report
  ============================ */
  async function fetchLatestReport(openImmediately = false) {
    try {
      const res = await axiosInstance.get("/hr/dailyReport/url");

      if (!res.data?.data) {
        setReportUrl("");
        return;
      }

      const relativePath = res.data.data;

      // ✅ Hard cache buster
      const freshUrl = `${BASE_URL}${relativePath}?ts=${Date.now()}&rnd=${Math.random()}`;

      setReportUrl(freshUrl);

      if (openImmediately) {
        window.open(freshUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to fetch report URL:", error);
      setReportUrl("");
    }
  }

  /* ============================
     Generate New PDF Every Click
  ============================ */
  async function generateAndView() {
    if (generating) return; // prevent double click

    try {
      setGenerating(true);

      // ✅ Force backend regeneration
      await axiosInstance.post("/hr/dailyReport/generate", {
        force: true,
        ts: Date.now(),
      });

      // ✅ Fetch new file URL after generation
      await fetchLatestReport(true);
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Failed to generate report. Check backend logs.");
    } finally {
      setGenerating(false);
    }
  }

  /* ============================
     Initial Load
  ============================ */
  useEffect(() => {
    fetchLatestReport(false);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 mt-6">
      <h2 className="text-xl font-semibold text-[#0D243C] mb-4">
        Daily Report
      </h2>

      {(loading || generating) ? (
        <div className="text-center py-10">
          <RefreshCw className="animate-spin mx-auto text-gray-500" size={40} />
          <p className="text-gray-500 mt-3">
            {generating ? "Generating report..." : "Loading report..."}
          </p>
        </div>
      ) : reportUrl ? (
        /* ============================
           Report Exists
        ============================ */
        <div className="text-center">
          <FileText className="text-blue-700 mx-auto mb-4" size={60} />
          <p className="text-gray-700 mb-4">
            Latest Generated Report
          </p>

          <div className="flex justify-center gap-4">
            {/* Generate + View */}
            <button
              onClick={generateAndView}
              disabled={generating}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
            >
              <FileText size={20} />
              Generate & View
            </button>

            {/* Download Always Latest */}
            <a
              href={reportUrl}
              download
              className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download size={20} />
              Download Latest
            </a>
          </div>
        </div>
      ) : (
        /* ============================
           No Report
        ============================ */
        <div className="text-center py-10">
          <AlertCircle className="text-orange-500 mx-auto" size={40} />
          <p className="text-gray-700 mt-3 font-medium mb-4">
            No Daily Report Found
          </p>

          <button
            onClick={generateAndView}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Report
          </button>
        </div>
      )}
    </div>
  );
}
