import { Box, Button, Container, CssBaseline, Grid, Link, Modal, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpdatePassword from "../../components/forgot-password";
import { useState } from "react";

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

const Login = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is requird"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const authResponse = await authAPI.Forgot(values);
        if(authResponse) {
            setUserId(authResponse.user.user_id);
            toggle()
        }
      }
      catch(e) {
        toast.error("Authentication Failed !", {
            position: "top-right",
            autoClose: 2000
          });
        console.log(e);
      }

    },
  });

  const toggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
        <Stack gap={2}>
          <TextField
            id="email"
            name="email"
            label="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          </Stack>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Forgot Password
            </Button>
        </form>
        <Grid container>
            <Grid item>
                <Link href="/login" variant="body2">
                Already have account? Sign In
                </Link>
              </Grid>
            </Grid>
      </Box>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <UpdatePassword toggle={toggle} user_id={userId} />
          </Box>
        </Modal>
    </Container>
  );
};

export default Login;
