import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GlobalContextProvider from './providers/context.provider';
import { theme } from './themes/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Home';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GlobalContextProvider>
    </LocalizationProvider>
  )
}

export default App
