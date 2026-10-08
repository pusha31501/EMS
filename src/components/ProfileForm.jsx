import { useState } from "react";
import { Loader2, User, Save } from "lucide-react";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
  };
  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="card p-5 sm:p-6 mb-6">
        <h2 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex gap-2 items-center">
          <User className="w-5 h-5 text-slate-500" /> Public Profile
        </h2>
        {error && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
            {error}
          </div>
        )}
        {message && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            {message}
          </div>
        )}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                value={`${initialData?.firstName} ${initialData?.lastName}`}
                disabled
                className="bg-slate-50 text-slate-400 cursor-not-allowed block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                email
              </label>
              <input
                value={initialData?.email}
                disabled
                className="bg-slate-50 text-slate-400 cursor-not-allowed block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="email"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Position
              </label>
              <input
                value={initialData?.position}
                disabled
                className="bg-slate-50 text-slate-400 cursor-not-allowed block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="position"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>
            <textarea
              disabled={initialData?.isDeleted}
              name="bio"
              defaultValue={initialData?.bio || ""}
              placeholder="Write a brief bio..."
              className={`resize-none ${initialData?.isDeleted ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "bg-white"} focus:ring-indigo-500 focus:border-indigo-500`}
            />
            <p className="text-xs text-slate-500 mt-2">
              This will be displayed on your profile page.
            </p>
          </div>
          {initialData?.isDeleted ? (
            <div className="pt-2">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-center">
                <p className="text-rose-600 font-medium tracking-tight">
                  Account Deactivated
                </p>
                <p className="text-sm text-rose-500 mt-0.5">
                  You can no longer update your profile
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
