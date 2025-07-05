import { Header } from '../../sections/Header/Header'
import { Signup } from '../../../features/auth'
import { StyledContainer } from './styles'

export const SignupPage = () => {
  return (
    <>
      <StyledContainer>
        <Header />
        <Signup />
      </StyledContainer>
    </>
  )
}
