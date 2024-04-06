import { Box, Button, Container, CssBaseline, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = (props) => {
  
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is requird"),
      password: Yup.string().required("Password is required"),
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
        try {
            const authResponse = await authAPI.SignUp(values);
            if(authResponse) { 
                toast.success("Registered successfully ", {autoClose: 2000})               
                navigate("/login")
            }
          }
          catch(e) {
            toast.error("Registration Failed !", {
                position: "top-right",
                autoClose: 2000
              });
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
             Register
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
    </Container>
  );
};

export default Register;
