'use client';

import React, { useState } from 'react';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import SchoolSelector from '@/components/user/school-select'; // your existing component
import { useRouter } from 'next/navigation';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
    return /^(\+?\d{1,3}[-.\s]?|\()?(\d{3}|\d{2,4})\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(phone);
}

export const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const next = () => {
        if (step === 1) {
            if (!emailOrPhone) return;

            if (!isValidEmail(emailOrPhone) && !isValidPhone(emailOrPhone)) {
                setError('Please enter a valid email or phone number.');
                return;
            }
            setError('');
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep((prev) => prev + 1);
        }, 800);
    };

    const handleSubmit = () => {
        if (!password) return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/accounts/login');
            }, 2000);
        }, 1000);
    };

    if (success) {
        return (
            <div className="text-center mt-6">
                <h2 className="text-xl font-semibold text-green-600">Account Created 🎉</h2>
                <p className="text-gray-600 mt-2">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center space-y-2 mb-6">
                <div className="bg-orange-600 rounded-full p-3 text-white">⭐</div>
                <h2 className="text-xl font-semibold">
                    {step === 1 && 'Join ShopMate'}
                    {step === 2 && 'Select Your School'}
                    {step === 3 && 'Set a Password'}
                </h2>
                <p className="text-gray-600 text-sm">
                    {step === 1 && 'Enter your email or phone to create an account'}
                    {step === 2 && 'Choose your school to customize your shopping'}
                    {step === 3 && 'Create a strong password to secure your account'}
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
                        onClick={next}
                        disabled={loading || !emailOrPhone || !!error}
                        className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
                    </Button>
                </>
            )}

            {step === 2 && (
                <>
                    <SchoolSelector value={school} onChange={(selected) => setSchool(selected)} />

                    <Button
                        onClick={next}
                        disabled={loading || !school}
                        className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
                    </Button>
                </>
            )}

            {step === 3 && (
                <>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !password}
                        className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                    </Button>
                </>
            )}

            <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{' '}
                <a href="/accounts/login" className="text-orange-600 hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
};

export default RegisterForm;
