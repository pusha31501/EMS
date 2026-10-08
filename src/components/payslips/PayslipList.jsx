import { format } from "date-fns";
import { Download } from "lucide-react";

const PayslipList = ({ payslips, isAdmin }) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr
                colspan={isAdmin ? 5 : 4}
                className="text-center text-slate-500 py-4"
              >
                No payslips found.
              </tr>
            ) : (
              payslips.map((payslip) => {
                return (
                  <tr key={payslip._id || payslip.id}>
                    {isAdmin && (
                      <td className="text-slate-900">
                        {payslip.employee?.firstName}{" "}
                        {payslip.employee?.lastName}
                      </td>
                    )}
                    <td className="text-slate-500">
                      {format(
                        new Date(payslip.year, payslip.month - 1),
                        "MMM yyyy",
                      )}
                    </td>
                    <td className="text-slate-500">
                      ${payslip.basicSalary?.toLocaleString()}
                    </td>
                    <td className="text-slate-800 font-medium">
                      ${payslip.netSalary?.toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          window.open(
                            `/print/payslips/${payslip._id || payslip.id}`,
                          )
                        }
                        className="btn btn-sm btn-primary gap-2 flex items-center justify-center"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
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

export default PayslipList;
