import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../Context/AuthCont'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null // Or a loading spinner
  }

  return children
}

export default ProtectedRoute
