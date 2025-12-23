import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard"; // default redirect

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome ${result.user.displayName}! 🎉`);
      axios.post('https://server-sooty-rho-35.vercel.app/users', { email: result.user.email, name: result.user.displayName })

      navigate(from, { replace: true }); // navigate to previous page
    } catch (error) {
      toast.error(error.message);
      console.error("Google login error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium text-gray-700">
        Continue with Google
      </span>
    </button>
  );
};

export default Social;
