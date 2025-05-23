// app/forgot-password/page.tsx
import React from 'react';
import { RegisterForm } from '@/components/auth/register-form';

const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <RegisterForm />
        </main>
    );
};

export default RegisterPage;
