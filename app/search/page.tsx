'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const mockData = {
    products: [
        { id: 1, name: 'Women Sneakers', href: '/products/women-sneakers' },
        { id: 2, name: 'Face Cream for Women', href: '/products/face-cream' },
    ],
    services: [
        { id: 1, name: 'Hostel Booking', href: '/services/hostel-booking' },
        { id: 2, name: 'Flight Reservation', href: '/services/flights' },
    ],
    categories: [
        { id: 1, name: 'Fashion', href: '/category/fashion' },
        { id: 2, name: 'Beauty', href: '/category/beauty' },
    ],
}

const SearchResultsPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')?.toLowerCase() || ''

    const filteredProducts = mockData.products.filter((item) =>
        item.name.toLowerCase().includes(query)
    )
    const filteredServices = mockData.services.filter((item) =>
        item.name.toLowerCase().includes(query)
    )
    const filteredCategories = mockData.categories.filter((item) =>
        item.name.toLowerCase().includes(query)
    )

    const hasResults =
        filteredProducts.length ||
        filteredServices.length ||
        filteredCategories.length

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-4">
                Search Results for: <span className="text-orange-600">"{query}"</span>
            </h1>

            {!hasResults && (
                <p className="text-gray-500">No results found for "{query}"</p>
            )}

            {filteredProducts.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <ul className="space-y-2">
                        {filteredProducts.map((product) => (
                            <li key={product.id}>
                                <Link
                                    href={product.href}
                                    className="text-orange-600 hover:underline"
                                >
                                    {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {filteredCategories.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Categories</h2>
                    <ul className="space-y-2">
                        {filteredCategories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={category.href}
                                    className="text-orange-600 hover:underline"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchResultsPage
