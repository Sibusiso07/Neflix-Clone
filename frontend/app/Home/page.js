"use client"

// Import packages
import { useEffect, useContext } from "react"

// Components
import Navigation from "../components/navigation"
import Feature from "../components/feature"
import ProtectedRoute from '../components/ProtectedRoute'
import { AuthContext } from "../Context/AuthCont"

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
                <Feature />
            </div>
        </ProtectedRoute>
    )
}