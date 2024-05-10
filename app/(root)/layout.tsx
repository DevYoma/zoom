import React from 'react'

type RootLayoutProp = {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProp) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default RootLayout