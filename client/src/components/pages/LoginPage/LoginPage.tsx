import { Header } from '../../sections/Header/Header'
import { Login } from '../../../features/auth'
import { StyledContainer } from './styles'

export const LoginPage = () => {
  return (
    <>
      <StyledContainer>
        <Header />
        <Login />
      </StyledContainer>
    </>
  )
}
