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
      <div className="relative">
        <Combobox.Input
          id="school"
          placeholder="Search for your school"
          displayValue={(school: string) => school}
          onChange={(event) => setQuery(event.target.value)}
          className="peer w-full rounded border-2 border-gray-300 px-2.5 pt-6 pb-2 pr-10 focus:border-orange-600 focus:ring-orange-600 placeholder-transparent"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </Combobox.Button>

        <label
          htmlFor="school"
          className="absolute left-3 top-2 text-sm text-gray-500 transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-600"
        >
          School
        </label>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/10">
            {isLoading ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                Loading...
              </div>
            ) : filteredSchools.length === 0 && query !== '' ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                No schools found.
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
