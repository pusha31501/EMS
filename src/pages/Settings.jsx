import { useState, useEffect } from "react";
import { dummyEmployeeData } from "../assets/assets";
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyEmployeeData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account settings</p>
      </div>
      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}
      {/*Change Password trigger*/}
      <div className="card max-w-md p-6 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="p-5 rounded-lg bg-slate-100">
            <Lock className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Password</p>
            <p className="text-sm text-slate-500">
              Update your account password at any time
            </p>
          </div>
        </div>
        <button
          className="btn btn-primary text-sm"
          onClick={() => setShowPasswordModal(true)}
        >
          Change
        </button>
      </div>
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;
