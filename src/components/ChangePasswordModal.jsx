import { useState } from "react";
import { Loader2Icon, Lock, X } from "lucide-react";
const ChangePasswordModal = ({ open, onClose }) => {
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop:blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-400" /> Change Password
          </h2>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-500 focus:outline-none"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {message.text && (
            <div
              className={`p-3 rounded-xl text-sm flex items-center gap-3  ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              <div
                className={`h-5 w-5 rounded-full  mt-1.5 shink-0 ${message.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
              />
              {message.text}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>
            <input
              required
              name="currentPassword"
              type="password"
              className="block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              required
              name="newPassword"
              type="password"
              className="block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-start gap-2 flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading && <Loader2Icon className="w-4 h-4 animate-spin" />}
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
