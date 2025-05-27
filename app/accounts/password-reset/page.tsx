// app/forgot-password/page.tsx
import React from 'react';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import Image from 'next/image';

const ForgotPasswordPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center -mt-8 bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                {/* Logo centered at top */}
                <div className="hidden flex-col justify-center items-center">
                    <Image
                        src="/jemfave.logo.png"  // Make sure the logo is in /public
                        alt="JEMFAVE Logo"
                        width={120}
                        height={60}
                        priority
                    />
                    <div className='tracking-widest'>Shop Your Style</div>
                </div>

                {/* Login form below logo */}
                <ForgotPasswordForm />

                {/* Logo centered at top */}
                <div className="hidden flex-col justify-center items-center">
                    <Image
                        src="/jemfave.png"  // Make sure the logo is in /public
                        alt="JEMFAVE Logo"
                        width={120}
                        height={60}
                        priority
                    />
                </div>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
