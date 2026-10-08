import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DEPARTMENTS } from "../assets/assets.jsx";
import { Loader2Icon } from "lucide-react";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const editmode = !!initialData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fade-in max-w-3xl"
    >
      {/* Personal Information */}
      <div className="card p-5 sm:p-6">
        <h3 className="card-title">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue={initialData?.firstName || ""}
              className="input input-bordered w-full"
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              defaultValue={initialData?.lastName || ""}
              className="input input-bordered w-full"
              placeholder="Enter last name"
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block mb-1 font-medium">
              Contact Number
            </label>
            <input
              type="number"
              id="contactNumber"
              defaultValue={initialData?.phone || ""}
              className="input input-bordered w-full"
              placeholder="Enter contact number"
              required
            />
          </div>
          <div>
            <label htmlFor="joinDate" className="block mb-1 font-medium">
              Join Date
            </label>
            <input
              type="date"
              id="joinDate"
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="input input-bordered w-full"
              placeholder="Enter join date"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="Bio" className="block mb-1 font-medium">
              Bio (Optional)
            </label>
            <textarea
              name="Bio"
              id="Bio"
              defaultValue={initialData?.bio || ""}
              className="input input-bordered w-full"
              placeholder="Brief Description......"
              rows={3}
              className="resize-none input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      {/* Job Information */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-200">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
          <div>
            <label htmlFor="department" className="block mb-2 font-medium">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="input input-bordered w-full"
              defaultValue={initialData?.department || ""}
              required
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="position" className="block mb-2 font-medium">
              Position / Designation
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className="input input-bordered w-full"
              defaultValue={initialData?.position || ""}
              placeholder="Enter position or designation"
              required
            />
          </div>
          <div>
            <label htmlFor="basicSalary" className="block mb-2 font-medium">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              id="basicSalary"
              className="input input-bordered w-full"
              defaultValue={initialData?.basicSalary || 0}
              required
              min={0}
              step={0.01}
            />
          </div>
          <div>
            <label htmlFor="allowances" className="block mb-2 font-medium">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              id="allowances"
              className="input input-bordered w-full"
              defaultValue={initialData?.allowances || 0}
              required
              min={0}
              step={0.01}
            />
          </div>
          <div>
            <label htmlFor="deductions" className="block mb-2 font-medium">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              id="deductions"
              className="input input-bordered w-full"
              defaultValue={initialData?.deductions || 0}
              required
              min={0}
              step={0.01}
            />
          </div>
          {editmode && (
            <div>
              <label
                htmlFor="employmentStatus"
                className="block mb-2 font-medium"
              >
                Employment Status
              </label>
              <select
                name="emplomentStatus"
                defaultValue={initialData?.employmentStatus}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/*Account setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="card-title">Account Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block mb-1 font-medium">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={initialData?.email || ""}
              className="input input-bordered w-full"
              placeholder="Enter your work email"
              required
            />
          </div>
          {!editmode && (
            <div>
              <label htmlFor="temporaryPassword">Temporary Password</label>
              <input
                type="password"
                id="temporaryPassword"
                name="email"
                required
              />
            </div>
          )}
          {editmode && (
            <div>
              <label htmlFor="changePassword">Change Password (Optional)</label>
              <input
                type="password"
                id="changePassword"
                name="email"
                placeholder="Leave blank to keep current"
              />
            </div>
          )}
          <div>
            <label htmlFor="Role">System Role</label>
            <select
              name="Role"
              id="Role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>
        </div>
      </div>
      {/*Buttons   */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            onCancel ? onCancel() : navigate(-1);
          }}
          className="btn-secondary w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {loading && <Loader2Icon className="animate-spin w-4 h-4 mr-2" />}
          {editmode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
