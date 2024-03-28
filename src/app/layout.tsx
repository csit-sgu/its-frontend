import type { Metadata } from 'next';
import dayjs from 'dayjs';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'CSIT',
  description: 'CSIT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dayjs.locale('ru-ru');

  return (
    <html lang="ru">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
