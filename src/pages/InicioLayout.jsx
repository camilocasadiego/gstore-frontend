import { Outlet } from "react-router-dom"

export const InicioLayout = () => {
  return (
    <div className="bg-slate-900 h-fit">
        <Outlet/>
    </div>
  )
}
