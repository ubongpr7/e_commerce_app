'use client';

import React, { useState, useEffect, useRef } from 'react';
import SanityClient from "@/lib/sanityClient";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface PhoneOrEmailInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const isEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

export default function PhoneOrEmailInput({
  label,
  value,
  onChange,
  required,
  error,
}: PhoneOrEmailInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch countries from Sanity
  useEffect(() => {
    async function fetchCountries() {
      try {
        const data: Country[] = await SanityClient.fetch(
          `*[_type == "country"]{name, code, dial_code, flag}`
        );
        setCountries(data);
        setSelectedCountry(data[0]); // default to first
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    setIsPhone(value.length > 0 && /^\d/.test(value) && !isEmail(value));
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isPhone && val.startsWith('0')) {
      val = val.substring(1);
    }
    onChange(val);
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    if (value.startsWith('0')) {
      onChange(value.substring(1));
    }
  };

  const floatLabel = isFocused || value.length > 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full font-sans ${error ? 'text-red-600' : 'text-gray-700'}`}
    >
      <label
        htmlFor="phoneOrEmailInput"
        className={`absolute left-2 px-2 bg-white transition-all pointer-events-none select-none
        ${floatLabel ? 'text-orange-600 text-xs -top-2' : 'text-gray-400 top-1/2 transform -translate-y-1/2 text-sm'}`}
      >
        {label} {required && '*'}
      </label>

      <div
        className="flex items-center border-2 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-600 focus-within:border-orange-600"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {isPhone && selectedCountry && (
          <div className="relative flex-shrink-0">
            <button
              type="button"
              className="flex items-center gap-1 pr-1 cursor-pointer select-none"
              onClick={() => setShowDropdown((v) => !v)}
              aria-label="Select country code"
              tabIndex={-1}
            >
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.dial_code}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <ul className="absolute z-20 top-full left-0 mt-1 max-h-48 w-44 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                {countries.map((country) => (
                  <li
                    key={country.code}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-orange-100"
                    onClick={() => handleSelectCountry(country)}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="ml-auto font-mono text-gray-500">{country.dial_code}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <input
          id="phoneOrEmailInput"
          type="text"
          value={value}
          onChange={handleInputChange}
          required={required}
          className={`flex-1 border-none outline-none bg-transparent text-gray-900 text-sm placeholder-transparent ${
            isPhone ? 'pl-2' : ''
          }`}
          placeholder={label}
          autoComplete="off"
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
