import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"

function Navbar() {
    const navigate = useNavigate();
    const { openSignIn } = useClerk();
    const { user } = useUser();

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center py-4">
                <h1
                    className="font-bold text-2xl sm:text-3xl italic text-zinc-700 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    SassFlow
                </h1>

                {user ? (
                    <div className="scale-90 sm:scale-100">
                        <UserButton />
                    </div>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="px-4 sm:px-6 py-2 text-sm sm:text-base text-white bg-zinc-800 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-zinc-900"
                    >
                        Get Started
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar
