'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setError('');

        try {
            alert(`Login attempted with email: ${email}`);
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                {error && (
                    <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Email Field */}
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="peer w-full rounded border-2 border-gray-300 px-3 pt-5 pb-2 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
                            placeholder="Email address"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-600"
                        >
                            Email address
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
                            placeholder="Password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
