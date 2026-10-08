import { useState } from "react";
import { Loader2Icon, Plus, X } from "lucide-react";
const GenerateSlipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Generate Slip
      </button>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        className="card max-w-lg w-full p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Generate Monthly Payslip</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/** Add form fields here for selecting employee, month, year, etc. **/}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select name="employee" className="form-select w-full" required>
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}{" "}
                  <p className="text-xs text-gray-500">({employee.position})</p>
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select name="month" className="form-select w-full" required>
                <option value="">Select Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                className="form-input w-full"
                required
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              className="form-input w-full"
              required
              placeholder="Enter basic salary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              className="form-input w-full"
              required
              defaultValue={0}
              placeholder="Enter deductions"
            />
          </div>
          {/** buttons **/}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={loading}
            >
              {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
              Generate Slip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateSlipForm;
