// app/forgot-password/page.tsx
import React from 'react';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

const ForgotPasswordPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPasswordPage;
