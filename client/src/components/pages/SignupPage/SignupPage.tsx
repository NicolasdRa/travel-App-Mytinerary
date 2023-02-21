import { Header } from '../../sections/Header/Header'
import { Signup } from '../../ui/Signup/Signup'
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
