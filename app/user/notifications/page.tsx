'use client'

import { Bell, Package, Wallet, Star } from 'lucide-react'

const notifications = [
    {
        id: 1,
        type: 'order',
        title: 'Your order #4563 has been shipped!',
        time: '2 hours ago',
        read: false,
    },
    {
        id: 2,
        type: 'wallet',
        title: '₦5,000 has been credited to your wallet',
        time: '5 hours ago',
        read: true,
    },
    {
        id: 3,
        type: 'promo',
        title: '🔥 10% off all products this week!',
        time: '1 day ago',
        read: false,
    },
    {
        id: 4,
        type: 'order',
        title: 'Order #4559 delivered successfully',
        time: '2 days ago',
        read: true,
    },
]

const getIcon = (type: string) => {
    switch (type) {
        case 'order':
            return <Package className="text-orange-600 w-5 h-5" />
        case 'wallet':
            return <Wallet className="text-green-600 w-5 h-5" />
        case 'promo':
            return <Star className="text-yellow-500 w-5 h-5" />
        default:
            return <Bell className="text-gray-500 w-5 h-5" />
    }
}

export default function NotificationsPage() {
    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`flex items-start gap-3 p-4 rounded-lg shadow-sm border ${notif.read ? 'bg-white' : 'bg-orange-50 border-orange-200'
                            }`}
                    >
                        <div className="pt-1">{getIcon(notif.type)}</div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
