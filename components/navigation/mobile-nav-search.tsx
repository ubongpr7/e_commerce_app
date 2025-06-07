"use client"

import React, { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const mockSuggestions = [
    "Women Shoes",
    "Men Sneakers",
    "Face Cream",
    "Hostel Booking",
    "Flight Reservation",
    "Zara Nigeria",
    "Fashion",
    "Electronics",
    "Health & Beauty",
]

const MobileNavSearch = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [showSearchPage, setShowSearchPage] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredSuggestions = searchTerm
        ? mockSuggestions.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : []

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
            resetSearch()
        }
    }

    const resetSearch = () => {
        setSearchTerm("")
        setShowSuggestions(false)
        setShowSearchPage(false)
    }

    const handleCancel = () => {
        resetSearch()
    }

    useEffect(() => {
        if (showSearchPage) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [showSearchPage])

    return (
        <>
            {/* Compact Search Bar (non-fullscreen) */}
            {!showSearchPage && (
                <div className="lg:hidden px-4 -mt-3 mb-2.5">
                    <form
                        onClick={() => setShowSearchPage(true)}
                        className="flex items-center gap-2"
                    >
                        <Input
                            type="text"
                            readOnly
                            placeholder="Search products, brands and categories..."
                            className="flex-1 h-8 text-sm text-gray-700 bg-gray-100 rounded-full cursor-pointer"
                        />
                        <Button
                            type="button"
                            size="icon"
                            className="bg-orange-600 hover:bg-orange-700 rounded-full h-8 w-8"
                        >
                            <Search className="h-2 w-2 text-white" />
                        </Button>
                    </form>
                </div>
            )}

            {/* Fullscreen Search Overlay */}
            {showSearchPage && (
                <div
                    className="fixed inset-0 z-50 bg-white flex flex-col"
                    style={{ height: "100dvh", overflow: "hidden" }} // 1. Lock root scroll
                >
                    {/* Fixed Search Header (absolutely fixed to top) */}
                    <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-md z-20">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <Input
                                ref={inputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setShowSuggestions(true)
                                }}
                                placeholder="Search products, brands and categories..."
                                className="flex-1 h-10 text-base border border-gray-300"
                                autoFocus
                            />
                            <Button
                                type="button"
                                size="icon"
                                onClick={handleCancel}
                                className="bg-orange-600 hover:bg-orange-700 rounded-full h-10 w-10"
                            >
                                <X className="h-4 w-4 text-white" />
                            </Button>
                        </form>
                    </div>

                    {/* Scrollable Suggestions (below the fixed header) */}
                    <div className="absolute top-[72px] bottom-0 left-0 right-0 overflow-y-auto z-10">
                        {showSuggestions && filteredSuggestions.length > 0 && (
                            <div className="divide-y divide-gray-200">
                                {filteredSuggestions.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={`/search?q=${encodeURIComponent(item)}`}
                                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                        onClick={resetSearch}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>
    )
}

export default MobileNavSearch
