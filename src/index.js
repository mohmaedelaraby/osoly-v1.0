import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RootRoutes } from './routes/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import './i18n/i18n.js'


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider  theme={extendTheme({ direction: "rtl" })}>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>

);

