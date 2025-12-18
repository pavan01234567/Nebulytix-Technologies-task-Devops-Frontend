export default function SuccessModal({ open, message, onOk }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-md w-[320px] text-center shadow-lg">
        <h2 className="text-lg font-semibold text-green-600">
          Success
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          {message}
        </p>

        <button
          onClick={onOk}
          className="mt-6 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
