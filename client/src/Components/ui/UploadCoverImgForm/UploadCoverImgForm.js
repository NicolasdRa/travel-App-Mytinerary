import React, { useState, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
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
  coverImage: {
    width: "100%",
  },

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

  text: {
    marginTop: "1rem",
    textAlign: "center",
  },

  formControl: {
    display: "flex",
    justifySelf: "space-between",
    minWidth: "30%",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  previewImgContainer: {
    display: "flex",
    maxHeight: "10em",
  },

  previewImg: {
    objectFit: "cover",
    overflow: "hidden",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "1rem",
  },

  submit_button: {
    display: "flex",
    margin: "1rem 0",
    padding: ".8rem",
  },

  btns: {
    paddingLeft: "1rem",
  },

  add_btn: {
    position: "fixed",
    bottom: "4rem",
    right: "1.5rem",
    zIndex: "1000",
  },
}));

const UploadCoverImgForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Global state - user info
  const { coverImg } = useSelector((state) => state.users.currentUser);

  // Component level state - profile info & file
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Pick your file");
  const [previewFile, setPreviewFile] = useState(null);

  // Ref needed to be able to hide default input and functionalise custom icon  btn
  const hiddenInput = useRef(null);

  const handleClick = (e) => {
    hiddenInput.current.click();
  };

  const handleChangeFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      fileReader.readyState === 2 && setPreviewFile(fileReader.result);
    };
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleClearImage = (e) => {
    setPreviewFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("coverImg", file);

    dispatch(updateProfileCoverImage(formData));
    dispatch(loadCurrentUser());
    setOpen(false);
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
          {/* <img
            className={classes.coverImage}
            src={coverImg}
            alt='background image'
          /> */}

          <DialogTitle
            id='form-dialog-title'
            disableTypography
            className={classes.title}>
            <Typography variant='body2'>Choose your cover image</Typography>
          </DialogTitle>
          <DialogContent>
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
            {previewFile ? (
              <Box className={classes.previewContainer}>
                <Box className={classes.previewImgContainer}>
                  <img
                    src={previewFile}
                    alt='preview file'
                    className={classes.previewImg}
                  />
                </Box>
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            {previewFile ? (
              <Button onClick={handleClearImage} color='tertiary'>
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
