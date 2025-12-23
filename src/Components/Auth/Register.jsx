import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";

import Social from "./Social";
import { auth } from "../../firebase.config";
import axios from "axios";

// Strong password regex: 8+ chars, uppercase, lowercase, number, special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            passwordRegex,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
});

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(result.user, { displayName: data.name });
            axios.post('https://server-sooty-rho-35.vercel.app/users', {email: data.email, name: data.displayName})

            toast.success("Account created successfully 🎉");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Create Account 🚀</h2>
                <p className="text-center text-gray-500 mt-1 mb-6">Start managing your tasks efficiently</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            {...register("name")}
                            placeholder="John Doe"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="you@example.com"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="At least 8 chars, 1 uppercase, 1 number"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>


                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <Social />

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
