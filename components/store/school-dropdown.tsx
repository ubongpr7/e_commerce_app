'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchoolStore, School } from "@/components/store/school-store";
import SanityClient from "@/lib/sanityClient";

interface SanitySchool {
  _id: string;
  name: string;
  slug: string;
  abbreviation: string;
}

export default function SchoolDropdown() {
  const { selectedSchool, setSelectedSchool } = useSchoolStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [schools, setSchools] = useState<SanitySchool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const results: SanitySchool[] = await SanityClient.fetch(
          `*[_type == "schooldrop"]{_id, name, "slug": slug.current, abbreviation}`
        );
        setSchools(results);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSelect = (school: SanitySchool) => {
    setSelectedSchool(school);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedSchool(null);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md shadow-sm px-4 py-2 text-center tracking-widest text-xs lg:text-sm font-medium text-gray-700"
      >
        {selectedSchool ? (
          <>
            <span className="block lg:hidden text-gray-700">{selectedSchool.abbreviation}</span>
            <span className="hidden lg:block text-gray-700">{selectedSchool.name}</span>
          </>
        ) : (
          "Find Your School"
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <input
              type="text"
              placeholder="Search school..."
              className="w-full px-3 py-2 text-gray-700 text-sm border-b border-gray-300 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="max-h-60 overflow-y-auto">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading schools...</div>
              ) : filteredSchools.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">No school found</div>
              ) : (
                filteredSchools.map((school) => (
                  <button
                    key={school._id}
                    onClick={() => handleSelect(school)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {school.name} ({school.abbreviation})
                  </button>
                ))
              )}
            </div>

            {selectedSchool && (
              <div className="border-t border-gray-200">
                <button
                  onClick={handleClear}
                  className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Clear selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
