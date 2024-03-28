'use client';

import dayjs from 'dayjs';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dayjs.locale('ru-ru');
  
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ru">
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <Navbar />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
