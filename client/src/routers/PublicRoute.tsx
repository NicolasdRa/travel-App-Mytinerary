import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../Components/Redux/store'

interface PublicRouteProps {
  children: JSX.Element
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return !isAuthenticated ? children : <Navigate to="/" />
}
