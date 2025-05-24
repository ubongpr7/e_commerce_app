// app/forgot-password/page.tsx
import React from 'react';
import { LoginForm } from '@/components/auth/login-form';

const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <LoginForm />
        </main>
    );
};

export default LoginPage;
