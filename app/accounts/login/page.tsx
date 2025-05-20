// components/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { FloatingInput } from '@/components/auth/floating-input';
import { PasswordInput } from '@/components/auth/password-input'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
    // Basic phone validation: digits, spaces, +, -, parentheses, min 7 digits
    return /^(\+?\d{1,3}[-.\s]?|\()?(\d{3}|\d{2,4})\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(phone);
}

export const LoginForm = () => {
    const [step, setStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleContinue = async () => {
        if (!emailOrPhone) return;

        if (!isValidEmail(emailOrPhone) && !isValidPhone(emailOrPhone)) {
            setError('Please enter a valid email or phone number.');
            return;
        }

        setError('');
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1000);
    };

    const handleLogin = async () => {
        if (!password) return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrPhone(e.target.value);
        if (error) setError('');
    };

    if (success) {
        return (
            <div className="text-center mt-6">
                <h2 className="text-xl font-semibold text-green-600">Login Successful 🎉</h2>
                <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
            </div>
        );
    }

    return (
        <main className='max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md'>
            <div>
                <div className="flex flex-col items-center space-y-2 mb-6">
                    <div className="bg-orange-600 rounded-full p-3 text-white">
                        ⭐
                    </div>
                    <h2 className="text-xl font-semibold">{step === 1 ? 'Welcome to ShopMate' : 'Welcome back!'}</h2>
                    <p className="text-gray-600 text-sm">
                        {step === 1
                            ? 'Enter your email or phone to continue'
                            : 'Enter your password to log in'}
                    </p>
                </div>

                {step === 1 && (
                    <>
                        <PhoneOrEmailInput
                            label="Email or Mobile Number"
                            value={emailOrPhone}
                            onChange={(val) => {
                                setEmailOrPhone(val);
                                if (error) setError('');
                            }}
                            required
                            error={error}
                        />

                        <Button
                            onClick={handleContinue}
                            disabled={loading || !emailOrPhone || !!error}
                            className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-1">Logging in as</div>
                            <div className="bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                                <span>{emailOrPhone}</span>
                                <button
                                    className="text-orange-600 text-sm"
                                    onClick={() => setStep(1)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            onClick={handleLogin}
                            disabled={loading || !password}
                            className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Login'}
                        </Button>

                        <Link href="/accounts/password-reset">
                            <div className="text-center mt-3 hidden">
                                <button className="text-sm text-orange-600">Forgot your password?</button>
                            </div>
                        </Link>
                    </>
                )}
            </div>

            <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <a href="/accounts/register" className="text-orange-600 hover:underline">
                    Register
                </a>
            </p>
            <p className="mt-2 text-sm text-center">
                <a href="/accounts/password-reset" className="text-orange-600 hover:underline">
                    Forgot your password?
                </a>
            </p>
        </main>
    );
};

export default LoginForm;
