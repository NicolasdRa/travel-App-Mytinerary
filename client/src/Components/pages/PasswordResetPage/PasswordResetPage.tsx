import { Header } from '../../sections/Header/Header'
import { PasswordResetForm } from '../../forms/PasswordResetForm/PasswordResetForm'
import { StyledContainer } from './styles'

export const PasswordResetPage: React.FC = () => {
  return (
    <StyledContainer>
      <Header />
      <PasswordResetForm match={undefined} history={undefined} />
    </StyledContainer>
  )
}
