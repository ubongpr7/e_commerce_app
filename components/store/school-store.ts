import { create } from "zustand";
import { persist } from "zustand/middleware";

// In your store (school-store.ts)
export interface School {
  _id: string;
  name: string;
  slug: string;
  abbreviation: string;
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
