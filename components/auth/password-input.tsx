import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showStrengthMeter?: boolean; // 👈 Add this line
}


const getPasswordStrength = (password: string) => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
        return 'strong';
    } else if (password.length >= 6) {
        return 'medium';
    } else {
        return 'weak';
    }
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label = 'Password', className, value = '', onChange, showStrengthMeter = true, ...props }, ref) => {
        const [show, setShow] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const strength = getPasswordStrength(value);

        // Float label when focused or value exists
        const floatLabel = isFocused || value.length > 0;

        return (
            <main>
                <div
                    className={cn(
                        'relative w-full font-sans',
                        'border rounded-md px-3 py-2',
                        'focus-within:ring-2 focus-within:ring-orange-600 focus-within:border-orange-600',
                        'border-gray-300',
                        className
                    )}
                >
                    <label
                        htmlFor="password-input"
                        className={cn(
                            'absolute left-2 px-2 bg-white transition-all pointer-events-none select-none text-orange-600',
                            floatLabel
                                ? 'text-xs lg:text-sm -top-2'
                                : 'text-gray-400 top-1/2 transform -translate-y-1/2 text-sm lg:text-base'
                        )}
                    >
                        {label}
                    </label>

                    <input
                        id="password-input"
                        ref={ref}
                        type={show ? 'text' : 'password'}
                        value={value}
                        onChange={onChange}
                        placeholder={label}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full border-none outline-none bg-transparent lg:text-base text-gray-900 text-sm placeholder-transparent pr-10"
                        {...props}
                    />

                    <div
                        onClick={() => setShow(!show)}
                        className="absolute right-4 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        aria-label={show ? 'Hide password' : 'Show password'}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShow(!show); }}
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                {showStrengthMeter && value && (
                    <div className="mt-2">
                        <div className="text-xs lg:text-sm font-normal">
                            <span
                                className={cn('transition-colors', {
                                    'text-red-500': strength === 'weak',
                                    'text-yellow-500': strength === 'medium',
                                    'text-green-600': strength === 'strong',
                                })}
                            >
                                Password strength: {strength}
                            </span>
                        </div>
                        {/* Optional progress bar (currently hidden) */}
                        <div className="h-1 w-full bg-gray-200 mt-1 rounded overflow-hidden hidden">
                            <div
                                className={cn('h-full transition-all', {
                                    'bg-red-500 w-1/4': strength === 'weak',
                                    'bg-yellow-500 w-2/4': strength === 'medium',
                                    'bg-green-600 w-full': strength === 'strong',
                                })}
                            />
                        </div>
                    </div>
                )}

            </main>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';
