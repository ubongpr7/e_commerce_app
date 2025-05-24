import React from 'react';
import { MainFooter } from '@/components/navigation/main-footer';
import { MainNav } from '@/components/navigation/main-nav';

export default function PrivacyNotice() {
    return (
        <main>
            <MainNav />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-6 mb-10">
                <h1 className="text-center text-orange-600 text-2xl font-semibold mb-4 lg:text-3xl">
                    Privacy Notice
                </h1>

                {/* 1. About this Notice */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        1. About this Notice
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        This Privacy Notice provides detailed information on how Student Shopping collects, uses, and safeguards your personal data when you use our web platform, mobile application, and associated services. This notice outlines the categories of data we collect, the purposes for which we use that data, and your rights regarding your information. Our commitment is to protect your privacy and ensure that your data is handled in compliance with all applicable laws and best practices.
                    </p>
                </section>

                {/* 2. Who We Are */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        2. Who We Are
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        Jemfave is an innovative e-commerce platform designed to serve students with exclusive deals and access to school-related products. We connect students with verified vendors, peer-to-peer marketplaces, and wallet-based transaction systems to ensure a seamless buying experience. The platform is operated by Student Shopping Ltd., a legally registered company operating across multiple educational institutions.
                    </p>
                </section>

                {/* 3. What Data We Collect */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        3. What Data We Collect
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2 lg:text-lg">
                        <li>Full name, email address, and phone number</li>
                        <li>School details and student identification</li>
                        <li>Wallet activity, transaction history, and purchase preferences</li>
                        <li>Device information and browser metadata</li>
                        <li>Usage behavior, including pages visited and time spent</li>
                    </ul>
                </section>

                {/* 4. How We Use Your Data */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        4. How We Use Your Data
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        We use your data to provide you with relevant products and services, process transactions through our secure wallet feature, and enhance your experience through personalized recommendations. We may also use data for security monitoring, fraud prevention, and to comply with legal obligations.
                    </p>
                </section>

                {/* 5. Your Rights */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        5. Your Rights
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2 lg:text-lg">
                        <li>Right to access your personal data</li>
                        <li>Right to request correction or deletion</li>
                        <li>Right to object to processing or request restriction</li>
                        <li>Right to data portability</li>
                        <li>Right to lodge a complaint with a regulatory authority</li>
                    </ul>
                </section>

                {/* 6. How We Protect Your Data */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        6. How We Protect Your Data
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        We implement a variety of technical and organizational security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. These include SSL encryption, secure server infrastructure, access control protocols, and regular audits.
                    </p>
                </section>

                {/* 7. Data Retention */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        7. Data Retention
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Notice or as required by applicable law. Once data is no longer needed, it is securely deleted or anonymized.
                    </p>
                </section>

                {/* 8. Changes to This Privacy Notice */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        8. Changes to This Privacy Notice
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        We may update this Privacy Notice from time to time to reflect changes in our practices, technology, or legal obligations. The most recent version will always be available on our platform.
                    </p>
                </section>

                {/* 9. Contact Us */}
                <section>
                    <h2 className="text-lg font-semibold text-orange-600 border-b border-orange-600 pb-1 mb-2 lg:text-2xl">
                        9. Contact Us
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-lg">
                        If you have any questions about this Privacy Notice or our handling of your personal data, please contact us at privacy@jemfave.com.
                    </p>
                </section>
            </div>
            <MainFooter />
        </main>
    );
}
