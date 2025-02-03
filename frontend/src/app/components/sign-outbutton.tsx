"use client"

import SignOut from "../(auth)/authactions/sign-out"

export default function SignOutButton() {
    const handleSignOut = async () => {
        try {
            await SignOut();
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSignOut}
            className="px-8 py-3 rounded-lg border-2 border-[#9B52E0] font-semibold text-white hover:bg-[#4a2b63] transition-colors"
        >
            Sign Out
        </button>
    );
}