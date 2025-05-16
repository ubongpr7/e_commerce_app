import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface School {
  name: string;
  abbreviation: string;
  slug: string;
}

interface SchoolState {
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
}

export const useSchoolStore = create<SchoolState>()(
  persist(
    (set) => ({
      selectedSchool: null,
      setSelectedSchool: (school) => set({ selectedSchool: school }),
    }),
    {
      name: "selected-school", // key in localStorage
    }
  )
);
