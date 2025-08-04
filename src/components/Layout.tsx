import React from 'react';
import Navbar from './Navbar';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export default function Layout({ children, showNavbar = true }: LayoutProps) {
  useTheme();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-16 md:pt-16' : ''}>
        {children}
      </main>
    </div>
  );
}