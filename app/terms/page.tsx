import React from 'react';
import { MainFooter } from '@/components/navigation/main-footer';
import { MainNav } from '@/components/navigation/main-nav';

export default function TermsOfService() {
    return (
        <main>
            <MainNav />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-6 mb-10">
                <h1 className="text-center text-orange-600 text-2xl font-semibold mb-10 lg:text-3xl">
                    Terms of Service
                </h1>

                {/* 1. Introduction */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        1. Introduction
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        Welcome to Student Shopping. These Terms of Service ("Terms") govern your use of our website, mobile application, wallet service, and any associated services provided by Student Shopping Ltd. By using our platform, you agree to comply with these Terms and all applicable laws.
                    </p>
                </section>

                {/* 2. Eligibility */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        2. Eligibility
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        Our services are intended solely for students. By registering, you confirm that you are a student with a valid student ID or other form of verification. Student Shopping reserves the right to deny access to anyone misrepresenting their status.
                    </p>
                </section>

                {/* 3. Account Creation and Responsibilities */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        3. Account Creation and Responsibilities
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        You must provide accurate information during account creation. You are responsible for safeguarding your login credentials and all activities that occur under your account. Student Shopping is not liable for any loss or damage from unauthorized use.
                    </p>
                </section>

                {/* 4. Wallet Use and Transactions */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        4. Wallet Use and Transactions
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        Student Shopping provides a wallet service for seamless purchases. Wallets must be funded before use. We do not process refunds except in verified cases of fraud or error. Transactions are final once completed.
                    </p>
                </section>

                {/* 5. Prohibited Conduct */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        5. Prohibited Conduct
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2 lg:text-lg">
                        <li>Engaging in fraudulent transactions or identity theft</li>
                        <li>Posting illegal or prohibited products or services</li>
                        <li>Using bots or scraping tools</li>
                        <li>Impersonating another user or Student Shopping staff</li>
                    </ul>
                </section>

                {/* 6. Intellectual Property */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        6. Intellectual Property
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        All content on the platform, including logos, icons, text, and graphics, is the property of Student Shopping Ltd. and is protected under intellectual property laws. Unauthorized use or duplication is strictly prohibited.
                    </p>
                </section>

                {/* 7. Termination */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        7. Termination
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        We reserve the right to terminate or suspend your account without notice for violation of these Terms or engaging in conduct that may harm the platform or its users.
                    </p>
                </section>

                {/* 8. Disclaimer and Limitation of Liability */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        8. Disclaimer and Limitation of Liability
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        Student Shopping is provided on an "as-is" and "as-available" basis. We make no warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from your use of our services.
                    </p>
                </section>

                {/* 9. Governing Law */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        9. Governing Law
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        These Terms are governed by the laws of your jurisdiction or country. You agree to resolve any disputes with Student Shopping through arbitration or courts as designated by local law.
                    </p>
                </section>

                {/* 10. Contact Information */}
                <section>
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        10. Contact Information
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        If you have questions or concerns about these Terms, please reach out to us at support@jemfave.com.
                    </p>
                </section>
            </div>
            <MainFooter />
        </main>
    );
}
