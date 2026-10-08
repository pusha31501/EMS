import { useState, useCallback, useEffect } from "react";
import { dummyAttendanceData } from "../assets/assets.jsx";
import Loading from "../components/Loading.jsx";
import CheckInButton from "../components/attendance/CheckInButton.jsx";
import AttendanceStats from "../components/attendance/AttendanceStats.jsx";
import AttendanceHistory from "../components/attendance/AttendanceHistory.jsx";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false); // Assuming you have a way to determine if the employee is deleted

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  const todayRecord = history.find((record) => {
    new Date(record.date).toDateString() === today.toDateString();
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          Track your work hours and daily attendance
        </p>
      </div>
      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600 font-semibold">
            You can no longer clock in or out because your employee records have
            been marked as deleted
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}
      <AttendanceStats history={history} onSuccess={fetchData} />
      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;
