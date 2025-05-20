'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FloatingInput } from '@/components/auth/floating-input';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';

export const ForgotPasswordForm = () => {
    const [step, setStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [code, setCode] = useState(Array(6).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [timer, setTimer] = useState(60);

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const router = useRouter();

    useEffect(() => {
        if (timer > 0 && step === 2) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, step]);

    const handleCodeChange = (index: number, value: string) => {
        // Accept only digits or empty string (for deletion)
        if (value === '' || /^\d$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setCodeError('');

            if (value && index < 5) {
                // Move to next input only if a digit is entered (not on deletion)
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text');
        if (/^\d{6}$/.test(pasted)) {
            const digits = pasted.split('');
            setCode(digits);
            inputRefs.current[5]?.focus();
        }
    };

    const validateEmailOrPhone = () => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const phoneRegex = /^\d{10,15}$/;
        return emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone);
    };

    const handleSendCode = () => {
        if (!validateEmailOrPhone()) {
            setError('Please enter a valid email or phone number');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            setTimer(60);
        }, 1000);
    };

    const handleResend = () => {
        setTimer(60);
        setCode(Array(6).fill(''));
        inputRefs.current[0]?.focus();
    };

    const handleVerifyCode = () => {
        if (code.join('').length !== 6) {
            setCodeError('Please enter the 6-digit code');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1000);
    };

    const handleResetPassword = () => {
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/accounts/login');
        }, 1000);
    };

    return (
        <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            {step === 1 && (
                <>
                    <div className="flex flex-col items-center space-y-2 mb-6">
                        <div className="bg-orange-600 rounded-full p-3 text-white">🔒</div>
                        <h2 className="text-xl font-semibold">Forgot your password?</h2>
                        <p className="text-gray-600 text-sm text-center">
                            Enter your email or phone number, and we’ll send you a 6-digit code.
                        </p>
                    </div>

                    <PhoneOrEmailInput
                        label="Email or Mobile Number"
                        value={emailOrPhone}
                        onChange={(val) => {
                            setEmailOrPhone(val);
                            setError('');
                        }}
                        required
                        error={error}
                    />

                    <Button
                        onClick={handleSendCode}
                        disabled={loading || !emailOrPhone}
                        className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Send Code'}
                    </Button>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="flex flex-col items-center space-y-2 mb-6">
                        <div className="bg-orange-600 rounded-full p-3 text-white">📩</div>
                        <h2 className="text-xl font-semibold">Enter the code</h2>
                        <p className="text-gray-600 text-sm text-center">
                            We've sent a 6-digit code to <strong>{emailOrPhone}</strong>
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 mb-2">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(idx, e.target.value)}
                                onPaste={handlePaste}
                                ref={(el) => { inputRefs.current[idx] = el!; }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                                        inputRefs.current[idx - 1]?.focus();
                                    }
                                }}
                                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        ))}
                    </div>

                    {codeError && <p className="text-red-500 text-sm mb-2">{codeError}</p>}

                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                            {timer > 0 ? `Resend code in ${timer}s` : ''}
                        </p>
                        {timer === 0 && (
                            <button
                                onClick={handleResend}
                                className="text-sm text-orange-600 hover:underline"
                            >
                                Resend Code
                            </button>
                        )}
                    </div>

                    <Button
                        onClick={handleVerifyCode}
                        disabled={loading || code.join('').length < 6}
                        className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify Code'}
                    </Button>
                </>
            )}

            {step === 3 && (
                <>
                    <div className="flex flex-col items-center space-y-2 mb-6">
                        <div className="bg-orange-600 rounded-full p-3 text-white">🔐</div>
                        <h2 className="text-xl font-semibold">Reset your password</h2>
                        <p className="text-gray-600 text-sm text-center">
                            Create a new password for your account.
                        </p>
                    </div>

                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordError('');
                        }}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError('');
                        }}
                        showStrengthMeter={false}
                        className='mt-2'
                    />

                    {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

                    <Button
                        onClick={handleResetPassword}
                        disabled={loading || !newPassword || !confirmPassword}
                        className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Reset Password'}
                    </Button>
                </>
            )}
        </div>
    );
};
