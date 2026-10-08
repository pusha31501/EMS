import { useState } from "react";
import { Loader2, Check, X } from "lucide-react";
import { format } from "date-fns";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (leaveId, status) => {
    setProcessing(leaveId);
  };
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr
                colspan={isAdmin ? 6 : 4}
                className="text-center text-slate-500 py-4"
              >
                No leave requests found.
              </tr>
            ) : (
              leaves.map((leave) => {
                return (
                  <tr key={leave._id || leave.id}>
                    {isAdmin && (
                      <td className="text-slate-900">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}
                    <td>
                      <span className="badge bg-slate-100 text-slate-600">
                        {leave.type}
                      </span>
                    </td>
                    <td className="text-slate-500 text-xs">
                      {format(new Date(leave.startDate), "MMM dd")} -
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>
                    <td
                      className="text-slate-500 max-w-xs truncate"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>
                    <td>
                      <span
                        className={`badge ${leave.status === "APPROVED" ? "badge-success" : leave.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  leave.id || leave._id,
                                  "APPROVED",
                                )
                              }
                              disabled={!!processing}
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            >
                              {processing === (leave.id || leave._id) ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  leave.id || leave._id,
                                  "REJECTED",
                                )
                              }
                              disabled={!!processing}
                              className="p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            >
                              {processing === (leave.id || leave._id) ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
