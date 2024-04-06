import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usersAPI } from '../api/users';
import { toast } from 'react-toastify';


export default function FileUpload(props) {
    const { toggle } = props;
  const formik = useFormik({
    initialValues: {
      myFile: ''
    },
    onSubmit: async (values) => {
        try {
            const formData = new FormData();
            formData.append("file", values.myFile)
          const response = await usersAPI.upload(formData)
            if(response) {
                toast.success("file uploaded", {autoClose:2000})
                toggle()
            }
        }
        catch(e) {

        }
    },
    validationSchema:  Yup.object().shape({
        myFile: Yup.mixed().required('file required').test('fileSize',
        'File exceeds the maximum supported size of 4 MB', (value) => !value || (value && value.size <= 1024 * 1024 * 5))
        ,
    }),
  })

  const handleChange = (e) => {
    formik.setFieldValue('myFile', e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <input type='file' name='myFile' accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*" onChange={handleChange}/>

      <div>{(formik.errors.myFile) ? <p style={{color: 'red'}}>{formik.errors.myFile}</p> : null}</div>
      <br/>
      <Button type='submit'>Upload</Button>
    </form>
      </div>
    
  );
}