// Este import no es necesario en la últimas versiones de React
// import React from 'react'

import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <>
        <div>AuthLayout</div>
        <Outlet/>
    </>
  )
}
