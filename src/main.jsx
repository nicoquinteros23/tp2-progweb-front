import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import MainPage from './pages/MainPage.jsx';
import StudentForm from './pages/StudentForm.jsx';
import StudentPage from './pages/table/StudentPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/students',
        element: <StudentPage />
      },
      {
        path: '/students/add',
        element: <StudentForm />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
);