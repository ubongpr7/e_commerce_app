'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'

const NotificationBell = () => {
    // Simulated unread count (replace with fetch from backend when ready)
    const unreadCount = 3

    return (
        <Link href="/notifications" className="relative inline-block">
            <Bell className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                </span>
            )}
        </Link>
    )
}

export default NotificationBell
