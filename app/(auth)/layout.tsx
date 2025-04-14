import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode}) {
  return (
    <div className='flex flex-col items-center
    justify-center h-screen gap-4'>{children}</div>
  )
}

export default layout