import { CalendarIcon, Building2Icon, FileTextIcon } from "lucide-react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: CalendarIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active Workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organizational Units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today Attendance",
      description: "Checked in Today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting Approval",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Admin — here's your overview
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card card-hover cursor-pointer p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70" />
              <p className="text-sm font-medium text-slate-700 ">
                {stat.label}
              </p>
              <span className="text-sm text-slate-500">{stat.description}</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>
            <stat.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
