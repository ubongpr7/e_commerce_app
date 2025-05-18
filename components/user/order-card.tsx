'use client'

import React from 'react'

export interface Order {
    id: string
    productName: string
    image: string
    totalAmount: number
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
    date: string
}


interface Props {
    order: Order
    onView: (order: Order) => void
    onCancel: (orderId: string) => void
}

const OrderCard: React.FC<Props> = ({ order, onView, onCancel }) => {
    const statusColors: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Shipped: 'bg-blue-100 text-blue-800',
        Delivered: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    }

    return (
        <div className="bg-white shadow rounded p-4 flex items-start gap-4">
            <img src={order.image} alt={order.productName} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <h3 className="font-semibold">{order.productName}</h3>
                <p className="text-sm text-gray-600">₦{order.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Ordered on: {new Date(order.date).toDateString()}</p>
                <div className={`text-xs px-2 py-1 mt-1 inline-block rounded ${statusColors[order.status]}`}>
                    {order.status}
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                    <button
                        onClick={() => onView(order)}
                        className="text-blue-600 hover:underline"
                    >
                        View Details
                    </button>
                    {order.status === 'Pending' && (
                        <button
                            onClick={() => onCancel(order.id)}
                            className="text-red-600 hover:underline"
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderCard
