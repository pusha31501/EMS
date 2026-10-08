import {
  getDayTypeDisplay,
  getWorkingHoursDisplay,
} from "../../assets/assets.jsx";
import { format } from "date-fns";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="font-seminbold text-slate-900">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Working Hours</th>
              <th className="px-6 py-4">Date Type</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr colspan="6" className="text-center text-slate-500 py-4">
                No Records Found
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);
                return (
                  <tr
                    key={record._id || record.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {getWorkingHoursDisplay(record)}
                    </td>
                    <td className="px-6 py-4">
                      {dayType.label !== "—" ? (
                        <span className={`badge ${dayType.className}`}>
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? "badge-warning" : "badge-danger"}`}
                      >
                        {record.status || "—"}
                      </span>
                    </td>
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

export default AttendanceHistory;
