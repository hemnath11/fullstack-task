import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Files from './Pages/Files/File-List';
import PrivateRoutes from './Auth';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Pages/auth/Forgot';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: '/files',
        element: <Files />
      }
    ]
  },
]);
const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
