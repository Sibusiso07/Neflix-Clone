"use client"

// import packages
import { useContext } from "react";
import Link from "next/link"

// Auth context
import { AuthContext } from "../Context/AuthCont";

export default function Navigation() {
    // Hook auth context
    const { user, setUser } = useContext(AuthContext);

    console.log('user: ', user)

    const handleSignOut = () => {
        // Clearing user context state
       setUser(null);
    }

    return (
        <nav className="w-full fixed z-40">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
                <img src="/logo.png" alt="Logo" className="flex-row ml-8 gap-7 hidden lg:flex h-12 pr-16"/>
                <div className="text-white cursor-pointer">
                    <Link href={'/Home'} className="px-6 hover:text-gray-300">Home</Link>
                    <Link href={'/Series'} className="px-6 hover:text-gray-300">Series</Link>
                    <Link href={'/Movies'} className="px-6 hover:text-gray-300">Movies</Link>
                    <Link href={'/NewAndPopular'} className="px-6 hover:text-gray-300">New & Popular</Link>
                    <Link href={'/MyList'} className="px-6 hover:text-gray-300">My List</Link>
                </div>
                <div className="absolute right-8 mr-8 mt-4">
                    <Link 
                    href={'/'}
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 text-xl">
                        Sign Out
                    </Link>
                </div>
            </div>
        </nav>
    )
}