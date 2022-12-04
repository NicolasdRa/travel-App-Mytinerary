import { Header } from '../../ui/Header/Header'
import { Login } from '../../ui/Login/Login'
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
