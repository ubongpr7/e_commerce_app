// components/FloatingInput.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils'; // utility to merge classNames

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, error, required, value = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const floatLabel = isFocused || (value && String(value).length > 0);

    return (
      <div className="relative w-full font-sans">
        {/* Label */}
        <label
          htmlFor={props.id}
          className={cn(
            'absolute left-2 px-2 bg-white transition-all pointer-events-none select-none text-orange-600',
            floatLabel
              ? 'text-xs -top-2'
              : 'text-gray-400 top-1/2 transform -translate-y-1/2 text-sm'
          )}
        >
          {label} {required && '*'}
        </label>

        <div
          className={cn(
            'flex items-center border rounded-md px-3 py-2',
            'transition-all',
            error
              ? 'border-red-500 focus-within:ring-red-500'
              : 'border-gray-300 focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-600'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <input
            ref={ref}
            id={props.id}
            value={value}
            placeholder={label}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 border-none outline-none bg-transparent text-gray-900 text-sm placeholder-transparent"
            {...props}
          />
        </div>

        {error && (
          <p className="text-sm mt-1 text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';
