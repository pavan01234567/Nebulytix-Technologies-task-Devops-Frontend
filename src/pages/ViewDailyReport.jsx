import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../api/config";
import { FileText, Download, RefreshCw, AlertCircle } from "lucide-react";

export default function ViewDailyReport() {
  const [reportUrl, setReportUrl] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadReport() {
    setLoading(true);

    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/hr/dailyReport/url`);

      if (res.data?.data) {
        const relativePath = res.data.data; // example: /reports/daily/file.pdf

        // ⭐ FIX: Use BASE_URL for static files (PDF)
        const fullPath = `${BASE_URL}${relativePath}`;

        setReportUrl(fullPath);
      } else {
        setReportUrl("");
      }
    } catch (error) {
      setReportUrl("");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
        View Daily Report
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        {loading ? (
          <div className="text-center py-10">
            <RefreshCw className="animate-spin mx-auto text-gray-500" size={40} />
            <p className="text-gray-500 mt-3">Loading...</p>
          </div>
        ) : reportUrl ? (
          <div className="text-center">
            <FileText className="text-blue-700 mx-auto mb-4" size={60} />

            <p className="text-gray-700 mb-4">Today's Daily Report</p>

            <div className="flex justify-center gap-4">
              {/* View PDF */}
              <a
                href={reportUrl}
                target="_blank"
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FileText size={20} />
                View
              </a>

              {/* Download PDF */}
              <a
                href={reportUrl}
                download
                className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Download size={20} />
                Download
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <AlertCircle className="text-red-500 mx-auto" size={40} />
            <p className="text-red-600 mt-3 font-medium">
              No Daily Report Found For Today
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
