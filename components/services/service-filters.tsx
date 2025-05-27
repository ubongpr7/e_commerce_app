// components/services/ServiceFilters.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const categories = ["Tutoring", "Repairs", "Design", "Transport", "Other"]

export default function ServiceFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [category, setCategory] = useState(searchParams.get("category") || "")
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

    const applyFilters = () => {
        const params = new URLSearchParams()
        if (category) params.set("category", category)
        if (minPrice) params.set("minPrice", minPrice)
        if (maxPrice) params.set("maxPrice", maxPrice)
        router.push(`/services?${params.toString()}`)
    }

    const clearFilters = () => {
        setCategory("")
        setMinPrice("")
        setMaxPrice("")
        router.push(`/services`)
    }

    return (
        <aside className="w-full sm:w-64 space-y-4">
            <div className="border p-4 rounded-lg bg-white shadow-sm">
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border px-2 py-1 text-sm rounded"
                >
                    <option value="">All</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="border p-4 rounded-lg bg-white shadow-sm">
                <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 border px-2 py-1 text-sm rounded"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 border px-2 py-1 text-sm rounded"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={applyFilters}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded"
                >
                    Apply Filters
                </button>
                <button
                    onClick={clearFilters}
                    className="w-full border text-sm px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>
        </aside>
    )
}
