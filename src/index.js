import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { RootRoutes } from './routes/routes';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

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

