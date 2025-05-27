'use client'

import { useState } from "react";

export default function SupportPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !subject || !message) {
            setError("Please fill in all fields.");
            setSuccess("");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // TODO: Replace with your backend API call to send/support message
            // Example:
            // await fetch('/api/support', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ name, email, subject, message }),
            // });

            setSuccess("Thank you for reaching out! We will get back to you soon.");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (err) {
            setError("Failed to send your message. Please try again later.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    const faqs = [
        {
            question: "How can I track my support request?",
            answer: "You will receive an email with a tracking number once your request is submitted.",
        },
        {
            question: "What is the typical response time?",
            answer: "Our team usually responds within 24-48 hours on business days.",
        },
        {
            question: "Can I update my support request after submitting?",
            answer: "Yes, simply reply to the confirmation email to update your request.",
        },
        {
            question: "Do you offer phone support?",
            answer: "Currently, we offer support via email and chat only.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenFAQ((prev) => (prev === index ? null : index));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-12 space-y-12">
            <div className="max-w-xl w-full bg-white p-8 rounded shadow">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Support & Help</h1>
                <p className="mb-6 text-gray-700">
                    Have questions or need help? Fill out the form below and we’ll get back to you as soon as possible.
                </p>

                {error && (
                    <p className="text-red-600 mb-4 font-medium">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 mb-4 font-medium">{success}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                            placeholder="Subject of your inquiry"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                            placeholder="Write your message here..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-orange-600 text-white rounded font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>

            {/* FAQ Section */}
            <div className="max-w-xl w-full bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="divide-y divide-gray-200">
                    {faqs.map((faq, index) => (
                        <div key={index} className="py-4">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full text-left text-gray-900 font-medium text-lg focus:outline-none"
                                aria-expanded={openFAQ === index}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${openFAQ === index ? "rotate-180" : "rotate-0"}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openFAQ === index ? "max-h-40 mt-2" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
