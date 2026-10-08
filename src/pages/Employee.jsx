import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets.jsx";
import { Plus, Search, X } from "lucide-react";
import Loading from "../components/Loading.jsx";
import EmployeeForm from "../components/EmployeeForm.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";
const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDepartment ? emp.department === selectedDepartment : emp,
      ),
    );
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [selectedDepartment]);

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) &&
      (selectedDepartment ? emp.department === selectedDepartment : true)
    );
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  return (
    <div className="animate-fade-in">
      {/*header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <p className="page-title">Employee Management</p>
          <p className="page-subtitle">Manage your employees efficiently</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>
      {/*search bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered max-w-40"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptname) => (
            <option key={deptname} value={deptname}>
              {deptname}
            </option>
          ))}
        </select>
      </div>
      {/*employee cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredEmployees.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
              No employees found.
            </p>
          ) : (
            filteredEmployees.map((emp) => (
              <EmployeeCard
                employee={emp}
                key={emp.id}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}
      {/* Create Employee Modal */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        >
          <div className="inset-0 fixed" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in "
          >
            <div className="flex justify-between items-center p-6 pb-0">
              <div>
                <h2 className="text-slate-900 text-lg font-semibold">
                  Add New Employee
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Create a user account and employee profile
                </p>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 pt-0">
              {/* Form fields for creating employee */}
              <EmployeeForm
                onSuccess={() => {
                  setShowCreateModal(false);
                  fetchEmployees();
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}
      {/* Edit Employee Modal */}
      {editEmployee && (
        <div
          onClick={() => setEditEmployee(null)}
          className="fixed inset-0 z-51 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
          >
            <div className="flex justify-between items-center p-6 pb-0">
              <div>
                <h2 className="text-slate-900 text-lg font-semibold">
                  Edit Employee
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Update employee information
                </p>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                onClick={() => setEditEmployee(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {/* Form fields for editing employee */}
              <EmployeeForm
                initialData={editEmployee}
                onSuccess={() => {
                  setEditEmployee(null);
                  fetchEmployees();
                }}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
