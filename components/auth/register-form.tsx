'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import SchoolSelector from '@/components/user/school-select';
import { useRouter } from 'next/navigation';
import PhoneOrEmailInput from '@/components/auth/phone-email-input';
import OTPInput from '@/components/auth/otp-input';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^(\+?\d{1,3}[-.\s]?|\()?(\d{3}|\d{2,4})\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(phone);
}

const steps = ['Input', 'OTP', 'School', 'Password', 'Confirm'];

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleResend = () => {
    console.log('Resend clicked');
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
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

  const handleSubmit = () => {
    if (!confirmPassword || confirmPassword !== password) {
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
    }, 1000);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
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
    <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-2xl border-orange-600 border-t-4 border-b-4">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`h-2 flex-1 mx-1 rounded-full transition-all duration-300 ${
              i < step ? 'bg-orange-600' : 'bg-gray-300'
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
          <h2 className="text-xl font-semibold lg:text-3xl">
            {step === 1 && 'Join Jemfave'}
            {step === 2 && 'Verify Account'}
            {step === 3 && 'Select School'}
            {step === 4 && 'Set Password'}
            {step === 5 && 'Confirm Password'}
          </h2>
          <p className="text-gray-600 text-sm lg:text-lg">
            {step === 1 && 'Enter your email or phone to create an account'}
            {step === 2 && `We've sent a 6-digit code to ${emailOrPhone}`}
            {step === 3 && 'Choose your school to customize your shopping'}
            {step === 4 && 'Create a strong password to secure your account'}
            {step === 5 && 'Re-enter your password to confirm'}
          </p>
        </div>
      </div>

      {/* Step Content with Animation */}
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
                className="w-full mt-6 bg-orange-600 lg:text-base lg:font-bold hover:bg-orange-700 text-white"
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
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify'}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <SchoolSelector value={school} onChange={(selected) => setSchool(selected)} />
              <Button
                onClick={() => setStep(4)}
                disabled={loading || !school}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={() => setStep(5)}
                disabled={loading || !password}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white lg:text-base lg:font-bold"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
              </Button>
            </>
          )}

          {step === 5 && (
            <>
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              <Button
                onClick={handleSubmit}
                disabled={loading || !confirmPassword}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 lg:text-base lg:font-bold text-white"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
              </Button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-sm text-center lg:text-base text-gray-600">
        Already have an account?{' '}
        <a href="/accounts/login" className="text-orange-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
