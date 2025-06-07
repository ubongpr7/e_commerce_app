'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const mockSuggestions = [
  'Women Shoes',
  'Men Sneakers',
  'Face Cream',
  'Hostel Booking',
  'Flight Reservation',
  'Zara Nigeria',
  'Fashion',
  'Electronics',
  'Health & Beauty',
]

const DesktopNavSearch = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = searchTerm
    ? mockSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="hidden lg:block">
      <form
        onSubmit={handleSubmit}
        className="relative w-full flex flex-row gap-1"
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowSuggestions(true)
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          placeholder="Search products, brands and categories..."
          className="w-full rounded-lg md:w-[300px] lg:w-[200px] text-xl bg-gray-100 pl-4 xl:w-[500px] text-gray-700"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-orange-600 hover:bg-orange-700 rounded-lg"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 lg:w-[502px] md:w-[300px] bg-white shadow-lg border rounded-lg p-2 text-sm">
          {filteredSuggestions.map((item, index) => (
            <li key={index}>
              <Link
                href={`/search?q=${encodeURIComponent(item)}`}
                className="block px-3 py-2 hover:bg-gray-100 text-gray-700 rounded-md transition"
                onClick={() => setShowSuggestions(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DesktopNavSearch
