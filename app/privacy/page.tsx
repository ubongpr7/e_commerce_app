import Nav2 from "@/components/navigation/nav2";

export default function PrivacyPolicyPage() {
    return (
        <main className="px-6 lg:px-8 py-32">

            <Nav2 />

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

            <section className="space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website or use our services.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">1. Information We Collect</h2>
                <p>
                    We may collect personal information such as your name, email address, wallet balance, and other relevant details when
                    you register or interact with our services.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">2. How We Use Your Information</h2>
                <p>
                    We use your information to:
                </p>
                <ul className="list-disc list-inside ml-4">
                    <li>Provide and manage your account</li>
                    <li>Process transactions</li>
                    <li>Improve our services</li>
                    <li>Send administrative updates or promotional content (optional)</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">3. Data Sharing</h2>
                <p>
                    We do not sell your personal information. We may share data with third parties to facilitate services,
                    comply with the law, or protect our rights.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Data Security</h2>
                <p>
                    We implement reasonable security measures to protect your data. However, no method of transmission or
                    storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Cookies</h2>
                <p>
                    We may use cookies to personalize your experience and analyze site traffic. You can choose to disable
                    cookies through your browser settings.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your personal information. To make a request,
                    please contact us at
                    <a href="mailto:privacy@jemfave.com" className="text-orange-600 underline ml-1">privacy@jemfave.com</a>.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">7. Changes to This Policy</h2>
                <p>
                    We may update this policy from time to time. All changes will be posted on this page with a revised effective date.
                </p>
            </section>
        </main>
    );
}
