import { useEffect, useState } from "react";
import {
  dummyEmployeeDashboardData,
  dummyAdminDashboardData,
} from "../assets/assets.jsx";
import Loading from "../components/Loading.jsx";
import EmployeeDashboard from "../components/EmployeeDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard
      </p>
    );

  if (data.role === "ADMIN") {
    return (
      <div>
        <AdminDashboard data={data} />
      </div>
    );
  } else {
    return (
      <div>
        <EmployeeDashboard data={data} />
      </div>
    );
  }
};

export default Dashboard;
