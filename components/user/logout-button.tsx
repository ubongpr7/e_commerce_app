import { useRouter } from "next/router";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear tokens or session info from localStorage/cookies here
        localStorage.removeItem("authToken"); // example token key
        // If using cookies, clear cookies via backend API or client method

        // Optionally call your Django logout API endpoint to invalidate session
        // await fetch('/api/logout', { method: 'POST' });

        // Redirect to login or home
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
            Logout
        </button>
    );
}
