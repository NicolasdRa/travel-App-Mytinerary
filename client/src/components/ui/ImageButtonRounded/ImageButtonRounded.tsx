import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { StyledContainer } from './styles'

const images = [
  {
    // url: '/resources/defaultProfileCover.jpg',
    title: 'profile',
    width: '80%',
  },
  // {
  //   url: '/static/images/grid-list/burgers.jpg',
  //   title: 'Burgers',
  //   width: '30%'
  // }
  //   {
  //     url: '/static/images/grid-list/camera.jpg',
  //     title: 'Camera',
  //     width: '30%'
  //   }
]

interface ImageButtonRoundedProps {
  img: string | Blob
  handleClick: () => void
}

const ImageButtonRounded: React.FC<ImageButtonRoundedProps> = ({
  img,
  handleClick,
}) => {
  return (
    <StyledContainer>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className="image"
          focusVisibleClassName="focusVisible"
          onClick={handleClick}
        >
          <span
            className="imageSrc"
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
          <span className="imageBackdrop" />
          <span className="imageButton">
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className="imageTitle"
            >
              change
              <span className="imageMarked" />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </StyledContainer>
  )
}

export default ImageButtonRounded
