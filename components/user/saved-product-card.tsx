'use client'

import React from 'react'
import { Heart, Eye } from 'lucide-react'

interface Product {
    id: string
    name: string
    image: string
    price: number
}

interface Props {
    product: Product
    onView: (product: Product) => void
    onRemove: (productId: string) => void
}

const SavedProductCard: React.FC<Props> = ({ product, onView, onRemove }) => {
    return (
        <div className="bg-white rounded shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center">
            <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-cover rounded"
            />
            <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-orange-600 font-bold text-sm">₦{product.price.toLocaleString()}</p>
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => onView(product)}
                        className="text-blue-600 flex items-center gap-1 hover:underline text-sm"
                    >
                        <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                        onClick={() => onRemove(product.id)}
                        className="text-red-600 flex items-center gap-1 hover:underline text-sm"
                    >
                        <Heart className="w-4 h-4" /> Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SavedProductCard
