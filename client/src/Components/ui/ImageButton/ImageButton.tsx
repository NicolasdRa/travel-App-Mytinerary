import { ButtonBase, Typography } from '@mui/material'
import { StyledContainer } from './styles'

const images = [
  {
    // url: '/resources/defaultProfileCover.jpg',
    title: 'cover',
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

interface ImageButonProps {
  coverImg: string | Blob
  handleClick: () => void
}

const ImageButton: React.FC<ImageButonProps> = ({ coverImg, handleClick }) => {
  return (
    <StyledContainer>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className="image"
          focusVisibleClassName="focusVisible"
          style={{
            width: image.width,
          }}
          onClick={handleClick}
        >
          <span
            className="imageSrc"
            style={{
              backgroundImage: `url(${coverImg})`,
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
              {image.title}
              <span className="imageMarked" />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </StyledContainer>
  )
}

export default ImageButton
