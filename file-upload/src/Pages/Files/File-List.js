import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Modal,
  Popover,
} from "@mui/material";
import { usersAPI } from "../../api/users";
import { API_BASE_PATH } from "../../api/constant";
import FileUpload from "../../components/file-upload";
import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Files() {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [path, setPath] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event, pathUrl) => {
    setAnchorEl(event.currentTarget);
    setPath(pathUrl);
  };

  const handleElClose = () => {
    setAnchorEl(null);
  };

  const openEl = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    getFiles();
  };

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const response = await usersAPI.getFiles();
      setFiles(response.files);
    } catch (e) {}
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl" style={{ marginTop: 3 }}>
      <Grid>
        <Grid item>
          <Button onClick={toggle}>Upload New File</Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Grid>
        <Grid container spacing={2}>
          {files &&
            files.length > 0 &&
            files.map((file, index) => {
              return (
                <Grid key={file._id} item md={4}>
                  <Card sx={{ maxWidth: 250 }}>
                    <CardHeader
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={(event) =>
                            handleClick(
                              event,
                              API_BASE_PATH + `/${file.file_path}`
                            )
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={file.meta_data.originalname}
                    />
                    {file.meta_data.mimetype === "image/png" ||
                    file.meta_data.mimetype === "image/jpg" ||
                    file.meta_data.mimetype === "image/jpeg" ? (
                      <CardMedia
                        component="img"
                        height="194"
                        image={API_BASE_PATH + `/${file.file_path}`}
                        alt={file.meta_data.originalname}
                      />
                    ) : <InsertDriveFileIcon />}
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Popover
          id={id}
          open={openEl}
          anchorEl={anchorEl}
          onClose={handleElClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Link href={path} target="_blank">
              {" "}
              Download{" "}
            </Link>
          </Typography>
        </Popover>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <FileUpload toggle={toggle} />
          </Box>
        </Modal>
      </Grid>
    </Container>
  );
}
