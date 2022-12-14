import { Header } from '../../ui/Header/Header'
import { PasswordResetForm } from '../../ui/PasswordResetForm/PasswordResetForm'
import { StyledContainer } from './styles'

export const PasswordResetPage: React.FC = () => {
  return (
    <StyledContainer>
      <Header />
      <PasswordResetForm match={undefined} history={undefined} />
    </StyledContainer>
  )
}
