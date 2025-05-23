'use client';

import { useEffect, useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import SanityClient from "@/lib/sanityClient";

interface School {
  _id: string;
  name: string;
}

interface SchoolSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SchoolSelect({ value, onChange }: SchoolSelectProps) {
  const [query, setQuery] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const results: School[] = await SanityClient.fetch(`*[_type == "school"]{_id, name}`);
        setSchools(results);
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const filteredSchools =
    query === ''
      ? schools
      : schools.filter((s) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={value} onChange={onChange}>
      <div
        className={`relative w-full font-sans
          border rounded-md px-3 py-2
          focus-within:ring-2 focus-within:ring-orange-600 focus-within:border-orange-600
          border-gray-300
        `}
      >
        <label
          htmlFor="school"
          className={`absolute left-2 px-2 bg-white transition-all pointer-events-none select-none
            ${((value?.length ?? 0) > 0 || isFocused)
              ? 'text-xs -top-2 text-orange-600'
              : 'text-gray-400 top-1/2 transform -translate-y-1/2 text-sm'}
          `}
        >
          Your School
        </label>

        <Combobox.Input
          id="school"
          placeholder="Your School"
          displayValue={(school: string) => school}
          onChange={(event) => setQuery(event.target.value)}
          className="peer w-full border-none outline-none bg-transparent text-gray-900 text-sm placeholder-transparent pr-10"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </Combobox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/10">
            {isLoading ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                Loading...
              </div>
            ) : filteredSchools.length === 0 && query !== '' ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                Can't find school
              </div>
            ) : (
              filteredSchools.map((s) => (
                <Combobox.Option
                  key={s._id}
                  value={s.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {s.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                          <Check className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
