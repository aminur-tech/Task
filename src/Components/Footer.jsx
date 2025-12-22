import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white">TaskFlow</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            TaskFlow helps you manage tasks efficiently with a clean and
            modern workflow experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-white transition">Dashboard</li>
            <li className="hover:text-white transition">Tasks</li>
            <li className="hover:text-white transition">Profile</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-4">
            <a className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <FaFacebookF size={14} />
            </a>
            <Link to={`https://github.com/aminur-tech`} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <FaGithub size={14} />
            </Link>
            <Link to={`https://www.linkedin.com/in/aminur-rahman4078`} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <FaLinkedinIn size={14} />
            </Link>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
