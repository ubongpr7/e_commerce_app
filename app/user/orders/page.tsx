'use client'

import React, { useState } from 'react'
import OrderCard, { Order } from '@/components/user/order-card'
import { Dialog } from '@headlessui/react'

const dummyOrders: Order[] = [
    {
        id: '1',
        productName: 'Wireless Headphones',
        image: '/images/headphones.jpg',
        totalAmount: 25000,
        status: 'Pending',
        date: new Date().toISOString(),
    },
    {
        id: '2',
        productName: 'Backpack',
        image: '/images/backpack.jpg',
        totalAmount: 18000,
        status: 'Delivered',
        date: new Date().toISOString(),
    },
]

const OrdersPage: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [orders, setOrders] = useState<Order[]>(dummyOrders)

    const handleView = (order: Order) => setSelectedOrder(order)

    const handleCancel = (orderId: string) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
        )
    }

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <div className="grid gap-4">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onView={handleView}
                        onCancel={handleCancel}
                    />
                ))}
            </div>

            {/* Modal */}
            <Dialog
                open={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white max-w-md w-full rounded p-6">
                        <Dialog.Title className="text-lg font-bold">Order Details</Dialog.Title>
                        {selectedOrder && (
                            <div className="mt-2 space-y-2">
                                <p>
                                    <strong>Product:</strong> {selectedOrder.productName}
                                </p>
                                <p>
                                    <strong>Total:</strong> ₦
                                    {selectedOrder.totalAmount.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selectedOrder.status}
                                </p>
                                <p>
                                    <strong>Order Date:</strong>{' '}
                                    {new Date(selectedOrder.date).toDateString()}
                                </p>
                            </div>
                        )}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default OrdersPage
