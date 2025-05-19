'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button";

const Nav3 = () => {
    return (
        <header className="fixed right-0 left-0 top-0 z-30 w-full mb-2 lg:mb-0 shadow-md bg-white">
            <div className="flex h-16 px-6 items-center justify-between lg:px-12">
                {/* Logo / Brand */}
                <Link href="/" className="text-2xl font-bold text-gray-800 tracking-widest">
                    JEMFAVE
                </Link>

                {/* Navigation */}
                <nav className="flex space-x-4 text-sm md:text-base">
                    <div className='text-orange-600'>Welcome</div>
                </nav>
            </div>

            <div className="bg-main-red tracking-widest text-white text-center w-full p-1 font-bold text-sm lg:hidden animate-blink">
                YOU'RE WELCOME
            </div>

            <div className="bg-main-red text-white tracking-widest text-center w-full p-2 font-semibold text-base hidden lg:block animate-blink">
                YOU ARE WELCOME TO JEMFAVE
            </div>
        </header>
    )
}

export default Nav3
