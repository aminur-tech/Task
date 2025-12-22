import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from 'react-hot-toast'
import Register from './Components/Auth/Register.jsx'
import Login from './Components/Auth/Login.jsx'
import HomeLayout from './layouts/HomeLayout.jsx'
import Dashboard from './pages/dashboard.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path:'/',
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <Toaster position="top-right" />
        <HomeLayout/>
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
