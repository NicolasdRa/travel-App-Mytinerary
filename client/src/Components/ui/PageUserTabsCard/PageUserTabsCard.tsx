import { CustomTabs } from '../CustomTabs/CustomTabs'
import { UserTab } from '../UserTab/UserTab'
import { StyledContainer } from './styles'

export const PageUserTabsCard = () => {
  return (
    <StyledContainer>
      <CustomTabs
        firstTabTitle={'My itineraries'}
        secondTabTitle={'My activities'}
        firstComponent={<UserTab parent="itineraries" />}
        secondComponent={<UserTab parent="activities" />}
      />
    </StyledContainer>
  )
}
