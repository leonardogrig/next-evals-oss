import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Welcome to our Next.js app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
