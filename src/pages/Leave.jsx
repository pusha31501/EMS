import { useState, useEffect, useCallback } from "react";
import { dummyLeaveData } from "../assets/assets.jsx";
import Loading from "../components/Loading.jsx";
import LeaveHistory from "../components/leave/LeaveHistory.jsx";
import {
  ThermometerIcon,
  UmbrellaIcon,
  PalmtreeIcon,
  PlusIcon,
} from "lucide-react";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal.jsx";

const Leave = () => {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Assuming you have a way to determine if the employee is deleted

  const isAdmin = true; // Replace with actual logic to determine if the user is an admin

  const fetchData = useCallback(async () => {
    setLeave(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const approvedLeaves = leave.filter(
    (request) => request.status === "APPROVED",
  );
  const sickCount = leave.filter((request) => request.type === "SICK").length;

  const casualCount = leave.filter(
    (request) => request.type === "CASUAL",
  ).length;
  const annualCount = leave.filter(
    (request) => request.type === "ANNUAL",
  ).length;

  const leaveStats = [
    { label: "Sick Leaves", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leaves", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leaves", value: annualCount, icon: PalmtreeIcon },
  ];
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-sm text-gray-500">
            {isAdmin
              ? "Manage leave applications for your team."
              : "View your leave history and requests."}
          </p>
        </div>
        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" /> Apply for Leave
          </button>
        )}
      </div>
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {leaveStats.map((stat) => (
            <div
              key={stat.label}
              className="card card-hover p-5 flex flex-col sm:flex-row justify-start items-center gap-2 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-slate-600 rounded-r-full group-hover:bg-blue-800" />
              <stat.icon className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">
                  {stat.value}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    taken
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <LeaveHistory leaves={leave} isAdmin={isAdmin} onUpdate={fetchData} />
      <ApplyLeaveModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default Leave;
