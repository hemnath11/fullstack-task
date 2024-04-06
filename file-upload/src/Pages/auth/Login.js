import { Box, Button, Container, CssBaseline, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is requird"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const authResponse = await authAPI.SignIn(values);
        if(authResponse) {
            sessionStorage.setItem("accessToken", authResponse.token);
            
            navigate("/files")
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
            id="username"
            name="username"
            label="username"
            type="username"
            placeholder="User Name"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          </Stack>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
        </form>
        <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
      </Box>
    </Container>
  );
};

export default Login;
