import React, { useState, useCallback, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { getCroppedImg, readFile } from "../../utils/imageUtils";
import "./styles.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import ImageButton from "../ImageButton/ImageButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { updateProfileCoverImage } from "../../Redux/users/userActions";
import { makeStyles } from "@material-ui/core/styles";
import { loadCurrentUser } from "../../Redux/users/userActions";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "1.5rem 0 0 0",
    padding: "0 1.5rem",
    textAlign: "center",
  },

  subtitle: {
    margin: "2.5rem 0 0 0 ",
    padding: 0,
    textAlign: "center",
  },

  input_field: {
    margin: ".8rem 0",
  },

  photoIconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },

  photo_icon: {
    height: "3rem",
    width: "3rem",
  },

  previewContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  btns: {
    paddingLeft: "1rem",
  },

  // cropper here below
  cropContainer: {
    margin: ".5rem 0 0 0",
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: "1rem",
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },

  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },

  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },

  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },

  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },

  slider: {
    padding: "22px 0px",
    marginLeft: 16,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
}));

const UploadCoverImgForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Global state - user info
  const { coverImg } = useSelector((state) => state.users.currentUser);

  // Component level state - profile info & file
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef(null);
  const handleClick = (e) => {
    hiddenInput.current.click();
  };

  // handles file input changes
  const handleChangeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  // creates cropped image base64 to show, upload or download
  const createCroppedImageFile = useCallback(async () => {
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation,
    );
    // console.log("done", { croppedImage });
    setCroppedImageFile(croppedImage);
  }, [imageSrc, croppedAreaPixels, rotation]);

  // handles crop complete
  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
      // console.log({ area: croppedArea }, { pixels: croppedAreaPixels });
      createCroppedImageFile();
    },
    [crop],
  );

  const handleClearImage = (e) => {
    setImageSrc(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // createCroppedImageFile();

    const formData = new FormData();
    formData.append("coverImg", croppedImageFile);

    dispatch(updateProfileCoverImage(formData));
    dispatch(loadCurrentUser());
    setOpen(false);
    setImageSrc(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ImageButton coverImg={coverImg} handleClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <DialogTitle
            id='form-dialog-title'
            disableTypography
            className={classes.title}>
            <Typography variant='body2'>
              Choose and adjust your cover image
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.contentContainer}>
            {imageSrc ? (
              <Box className={classes.previewContainer}>
                <div className={classes.cropContainer}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={handleCropComplete}
                  />
                </div>
                <div className={classes.controls}>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant='overline'
                      classes={{ root: classes.sliderLabel }}>
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby='Zoom'
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ root: classes.slider }}
                    />
                  </div>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant='overline'
                      classes={{ root: classes.sliderLabel }}>
                      Rotate
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby='Rotation'
                      classes={{ root: classes.slider }}
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </div>
                </div>
              </Box>
            ) : (
              <Box className={classes.photoIconContainer}>
                <input
                  style={{ display: "none" }}
                  id='customFile'
                  onChange={handleChangeFile}
                  type='file'
                  ref={hiddenInput}
                />
                <IconButton onClick={handleClick}>
                  <AddAPhotoIcon
                    color='secondary'
                    className={classes.photo_icon}
                  />
                </IconButton>
              </Box>
            )}
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            {imageSrc ? (
              <Button onClick={handleClearImage} color='default'>
                Clear
              </Button>
            ) : null}
            <Button onClick={handleSubmit} color='secondary'>
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default connect(null, { updateProfileCoverImage })(UploadCoverImgForm);
