import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../Components/Redux/store'

interface PublicRouteProps {
  children: JSX.Element
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return children
}
