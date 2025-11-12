export default function SuccessMessage({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <div className="text-green-600 text-5xl mb-3">✅</div>
        <h2 className="text-xl font-semibold mb-2">Application Submitted!</h2>
        <p className="text-gray-600">
          Thank you for applying. Our team will review your application soon.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
