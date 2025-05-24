'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';
import OTPInput from '@/components/auth/otp-input';
import { PasswordInput } from '@/components/auth/password-input';
import { useRouter } from 'next/navigation';

const steps = ['Input', 'OTP', 'New Password', 'Confirm Password'];

const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) =>
    /^(\+?\d{1,3}[-.\s]?|\()?(\d{3}|\d{2,4})\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(phone);

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleResend = () => {
    console.log('Resend clicked');
  };

  const handleNextFromInput = () => {
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

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleNextFromNewPassword = () => {
    if (!newPassword) return;

    setStep(4);
  };

  const handleResetPassword = () => {
    if (!confirmPassword) return;

    if (confirmPassword !== newPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/accounts/login');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold text-green-600">Password Reset 🎉</h2>
        <p className="text-gray-600 mt-2">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-2xl">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 mx-1 rounded-full transition-all duration-300 ${
              i < step ? 'bg-orange-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Title & Subtext */}
      <div className="flex items-center mb-4 space-x-3">
        {step > 1 && (
          <button onClick={handleBack} className="text-gray-600 hover:text-orange-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold lg:text-3xl">
            {step === 1 && 'Reset Password'}
            {step === 2 && 'Verify Code'}
            {step === 3 && 'New Password'}
            {step === 4 && 'Confirm Password'}
          </h2>
          <p className="text-gray-600 text-sm lg:text-lg">
            {step === 1 && 'Enter your email or phone to receive a reset code'}
            {step === 2 && `We’ve sent a 6-digit code to ${emailOrPhone}`}
            {step === 3 && 'Create a strong new password for your account'}
            {step === 4 && 'Re-enter your new password to confirm'}
          </p>
        </div>
      </div>

      {/* Step Content */}
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
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
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
                onComplete={(val) => setOtp(val)}
                error={error}
                length={6}
                onResend={handleResend}
              />
              <Button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify'}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                onClick={handleNextFromNewPassword}
                disabled={loading || !newPassword}
                className="w-full mt-6 bg-orange-600 lg:text-base lg:font-bold hover:bg-orange-700 text-white"
              >
                Continue
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError('');
                }}
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              <Button
                onClick={handleResetPassword}
                disabled={loading || !confirmPassword}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Reset Password'}
              </Button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-sm text-center text-gray-600 lg:text-base">
        Remembered your password?{' '}
        <a href="/accounts/login" className="text-orange-600 lg:text-base hover:underline">
          Back to Login
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
