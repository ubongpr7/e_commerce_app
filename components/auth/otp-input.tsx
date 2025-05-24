'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type OTPInputProps = {
    value: string;
    onChange: (value: string) => void;
    onComplete?: (code: string) => void;
    error?: string;
    length?: number;
    onResend?: () => void;
};

const OTPInput: React.FC<OTPInputProps> = ({
    value,
    onChange,
    onComplete,
    error = '',
    length = 6,
    onResend,
}) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const [resendTrigger, setResendTrigger] = useState<number>(0);

    // Countdown timer for resend
    useEffect(() => {
        setTimeLeft(60);
        setIsResendDisabled(true);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTrigger]);

    // Auto focus next input when typing, and trigger onComplete
    useEffect(() => {
        if (value.length < length) {
            inputsRef.current[value.length]?.focus();
        } else if (value.length === length && onComplete) {
            onComplete(value);
        }
    }, [value, length, onComplete]);

    const handleBoxClick = () => {
        hiddenInputRef.current?.focus();
    };

    const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, length);
        onChange(val);
        if (val.length === length && onComplete) {
            onComplete(val);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value.replace(/\D/g, '');
        if (!val) return;

        const updated = value.split('');
        updated[index] = val.slice(-1);
        const newVal = updated.join('').padEnd(length, '');
        onChange(newVal);

        if (index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // Trigger verify early if filled
        const newFilled = newVal.replace(/[^0-9]/g, '');
        if (newFilled.length === length && onComplete) {
            onComplete(newFilled);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const updated = value.split('');
            if (value[index]) {
                updated[index] = '';
                onChange(updated.join(''));
            } else if (index > 0) {
                updated[index - 1] = '';
                onChange(updated.join(''));
                inputsRef.current[index - 1]?.focus();
            }
            e.preventDefault();
        }
    };

    const handleResend = () => {
        if (onResend) onResend();
        setResendTrigger((prev) => prev + 1);
    };

    return (
        <div className="space-y-4">
            {/* Hidden input for autofill/paste support */}
            <input
                ref={hiddenInputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={value}
                onChange={handleHiddenInputChange}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
            />

            <div className="flex justify-center gap-2" onClick={handleBoxClick}>
                {Array.from({ length }).map((_, i) => (
                    <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value[i] || ''}
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => {
                            inputsRef.current[i] = el;
                        }}
                        className="w-10 h-12 text-center border lg:text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-lg"
                    />
                ))}
            </div>

            {error && <p className="text-sm text-red-600 lg:text-base text-center">{error}</p>}

            <div className="text-center text-sm text-gray-600">
                {isResendDisabled ? (
                    <p>
                        Resend code in <span className="font-semibold">{timeLeft}s</span>
                    </p>
                ) : (
                    <Button
                        variant="link"
                        size="sm"
                        onClick={handleResend}
                        className="text-orange-600 hover:underline lg:text-base p-0"
                    >
                        Resend Code
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OTPInput;
