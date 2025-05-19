'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SchoolSelect from '@/components/user/school-select';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !school || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setLoading(true);
        try {
            alert(`Registered ${fullName} (${email}) from ${school}`);
        } catch (err) {
            setError('Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                {error && <p className="text-red-600 text-center text-sm">{error}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="relative">
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className={`peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent`}
                            placeholder="Full Name"
                        />
                        <label
                            htmlFor="fullName"
                            className={`absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600`}
                        >
                            Full Name
                        </label>
                    </div>


                    {/* Email */}
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
                            placeholder="Email Address"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600"
                        >
                            Email Address
                        </label>
                    </div>


                    {/* School Select */}
                    <SchoolSelect value={school} onChange={setSchool} />

                    {/* Password */}
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 pr-10 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
                            placeholder="Create Password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600"
                        >
                            Password
                        </label>
                        {password.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>


                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            id="password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 pr-10 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
                            placeholder="Create Password"
                        />
                        <label
                            htmlFor="confirmpassword"
                            className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600"
                        >
                            Confirm Password
                        </label>
                        {confirmPassword.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded bg-orange-600 py-2 text-white font-semibold hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
