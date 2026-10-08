import { useState } from "react";
import { X, FileText, Calendar1Icon, Loader2, Send } from "lucide-react";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          {/*---Header---*/}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Apply for Leave</h2>
            <p className="text-sm text-gray-500">
              Fill out the form below to submit your leave request.
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/*---form---*/}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/*---leave type---*/}
          <div>
            <label className="flex gap-2 items-center text-sm font-medium text-slate-700 mb-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Leave Type
            </label>
            <select
              name="leaveType"
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/*---duration---*/}
          <div>
            <label className="flex gap-2 items-center text-sm font-medium text-slate-700 mb-2">
              <Calendar1Icon className="w-4 h-4 text-slate-400" />
              Duration
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <span className="block text-xs text-slate-400 mb-1">from</span>
                <input type="date" name="startDate" required min={minDate} />
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-1">to</span>
                <input type="date" name="endDate" required min={minDate} />
              </div>
            </div>
          </div>
          {/*---reason---*/}
          <div>
            <label className="block gap-2 text-sm font-medium text-slate-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              required
              rows={3}
              className="resize-none"
              placeholder="Briefly describe why you need this leave"
            />
          </div>
          {/*---buttons---*/}
          <div className="flex gap-3 pt-2">
            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting...." : "Submit"}
            </button>
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
