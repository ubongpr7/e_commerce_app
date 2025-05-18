'use client'

import React, { useState } from 'react'
import SavedProductCard from '@/components/user/saved-product-card'

const dummySavedProducts = [
  {
    id: '1',
    name: 'Bluetooth Speaker',
    image: '/images/speaker.jpg',
    price: 9500,
  },
  {
    id: '2',
    name: 'Sketchbook + Pen',
    image: '/images/sketch.jpg',
    price: 3000,
  },
]

const SavedProductsPage: React.FC = () => {
  const [savedProducts, setSavedProducts] = useState(dummySavedProducts)

  const handleView = (product: any) => {
    alert(`View details for "${product.name}"`) // Replace with routing logic later
  }

  const handleRemove = (productId: string) => {
    setSavedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Products</h1>
      {savedProducts.length === 0 ? (
        <p className="text-center text-gray-500">You haven't saved any products yet.</p>
      ) : (
        <div className="grid gap-4">
          {savedProducts.map((product) => (
            <SavedProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedProductsPage
