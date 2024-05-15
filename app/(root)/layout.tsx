import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Yooma",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};


type RootLayoutProp = {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProp) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout