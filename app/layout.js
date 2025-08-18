'use client';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css";

const queryClient = new QueryClient();

const RootLayout = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const { worker } = require('../mocks/browser');
      worker.start({ onUnhandledRequest: 'bypass' });
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout