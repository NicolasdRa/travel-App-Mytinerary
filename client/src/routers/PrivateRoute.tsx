import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../Components/Redux/store'

interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return isAuthenticated ? children : <Navigate to="/login" />
}
