import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="relative">
      <img
        onClick={() => setOpen(!open)}
        src={user.photoURL || "https://i.pravatar.cc/40"}
        alt="profile"
        className="w-9 h-9 rounded-full cursor-pointer border"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
          <p className="px-4 py-2 text-sm text-gray-600 truncate">
            {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
