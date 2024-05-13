import StreamVideoProvider from '@/providers/StreamClientProvider';
import React from 'react'

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