import { Link, NavLink } from "react-router";
import ProfileMenu from "./ProfileManu";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black"
        : "text-gray-500 hover:text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16  items-center justify-between px-6 lg:px-10">
        
        {/* Left Section: Logo & Primary Nav */}
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-black flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              TaskFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Dashboard
            </NavLink>
            {/* Add more NavLinks here in the future */}
          </nav>
        </div>

        {/* Right Section: Auth & Profile */}
        <div className="flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 transition hover:text-black"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center border-l pl-6 border-gray-200">
              <ProfileMenu user={user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;