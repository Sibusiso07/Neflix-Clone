"use client"

// Import packages
import { useEffect, useContext } from "react"

// Components
import Navigation from "../components/navigation";
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContext } from "../Context/AuthCont";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";

export default function() {
    // Hook context
    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <ProtectedRoute>
            <div>
                <Navigation />
                <Billboard />
                <div className="pb-40">
                    <MovieList />
                </div>
            </div>
        </ProtectedRoute>
    )
}