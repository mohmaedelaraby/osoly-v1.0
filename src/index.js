import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { RootRoutes } from './routes/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import './i18n/i18n.js'
import { createTheme } from '@mui/material';


const queryClient = new QueryClient();
const MuiTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
         
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>

);

