import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usersAPI } from '../api/users';
import { toast } from 'react-toastify';
import { authAPI } from '../api/auth';
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword(props) {
    const { toggle, user_id } = props;
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
        try {
            const data = {
                user_id: user_id,
                password: values.password
            }
          const response = await authAPI.ResetPassword(data)
            if(response) {
                toast.success("Updated successfully", {autoClose:2000})
                toggle()
                navigate("/login")
            }
        }
        catch(e) {

        }
    },
    validationSchema:  Yup.object().shape({
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  })

  const handleChange = (e) => {
    formik.setFieldValue('myFile', e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
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
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button type='submit'>Reset</Button>
      </Stack>
    </form>
      </div>
    
  );
}