'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';
import OTPInput from '@/components/auth/otp-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/auth/password-input';


function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
    return /^(\+?\d{1,3}[-.\s]?|\()?(\d{3}|\d{2,4})\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(phone);
}

const steps = ['Input', 'OTP', 'Password'];

export const LoginForm = () => {
    const [step, setStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [resendTrigger, setResendTrigger] = useState(0);

    const router = useRouter();

    const handleResend = () => {
        console.log('Resending OTP...');
        setResendTrigger(prev => prev + 1);
    };

    const sendOTP = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1000);
    };

    const verifyOTP = () => {
        if (otp.length !== 6) {
            setError('Please enter the 6-digit code.');
            return;
        }
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1000);
    };

    const handleLogin = () => {
        if (!password) {
            setError('Password is required.');
            return;
        }
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }, 1000);
    };

    const handleNextFromInput = () => {
        if (!emailOrPhone) return;

        if (!isValidEmail(emailOrPhone) && !isValidPhone(emailOrPhone)) {
            setError('Please enter a valid email or phone number.');
            return;
        }

        setError('');
        sendOTP();
    };

    const goBack = () => {
        if (step > 1) setStep(step - 1);
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
        <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 flex-1 mx-1 rounded-full transition-all duration-300 ${i < step ? 'bg-orange-600' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>

            {/* Title */}
            <div className="flex items-center mb-4 space-x-3">
                {step > 1 && (
                    <button onClick={goBack} className="text-gray-600 hover:text-orange-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">
                        {step === 1 && 'Welcome Back'}
                        {step === 2 && 'Verify Your Login'}
                        {step === 3 && 'Enter Your Password'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {step === 1 && 'Enter your email or phone to log in'}
                        {step === 2 && `We've sent a 6-digit code to ${emailOrPhone}`}
                        {step === 3 && 'Enter your password to continue'}
                    </p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
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
                                onClick={handleNextFromInput}
                                disabled={loading || !emailOrPhone || !!error}
                                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                onComplete={(code) => console.log('OTP complete:', code)}
                                error={error}
                                length={6}
                                onResend={handleResend}
                            />
                            <Button
                                onClick={verifyOTP}
                                disabled={loading || otp.length !== 6}
                                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify'}
                            </Button>
                        </>
                    )}

                    {step === 3 && (
                        <>
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
                        </>
                    )}
                </motion.div>
            </AnimatePresence>

            <p className="mt-4 text-sm text-center text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="/accounts/register" className="text-orange-600 hover:underline">
                    Register
                </a>
            </p>
            <p className="mt-2 text-sm text-center">
                <a href="/accounts/password-reset" className="text-orange-600 hover:underline">
                    Forgot your password?
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
