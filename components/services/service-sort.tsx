// components/services/ServiceSort.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"

const options = [
    { label: "Most Popular", value: "popular" },
    { label: "Lowest Price", value: "price-asc" },
    { label: "Highest Price", value: "price-desc" },
    { label: "Newest", value: "newest" },
]

export default function ServiceSort({ total }: { total: number }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", e.target.value)
        router.push(`/services?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{total} services found</p>

            <select
                onChange={handleChange}
                defaultValue={searchParams.get("sort") || ""}
                className="rounded border px-2 py-1 text-sm"
            >
                <option value="">Sort by</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
