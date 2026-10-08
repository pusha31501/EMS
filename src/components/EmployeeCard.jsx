import { PencilIcon, Trash2Icon } from "lucide-react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      )
    ) {
      onDelete(employee);
    }
  };
  return (
    <div className="group relative card card-hover overflow-hidden bg-base-100 shadow-xs">
      <div className="relative aspect-4/4 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-50">
        <div className="w-full h-full flex items-center justify-center p-4">
          {/* circle icons*/}
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-2xl text-indigo-500 flex items-center justify-center font-semibold">
              {employee.firstName.charAt(0)}
              {employee.lastName.charAt(0)}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-white p-1 rounded-md shadow-2xs text-slate-700">
          {employee.department || "Remote"}
          {employee.isDeleted && (
            <span className="text-red-500 text-xs ml-1">(Deleted)</span>
          )}
        </span>
      </div>
      {!employee.isDeleted && (
        <div className="absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
          <button
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white/80 transition-colors duration-300"
            onClick={() => onEdit(employee)}
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white/80 transition-colors duration-300"
            onClick={handleDelete}
          >
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="p-4">
        <h3 className=" text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-xs text-slate-500">{employee.position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
