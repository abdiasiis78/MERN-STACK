import { Outlet } from "react-router-dom"
import Header from "./components/component/Header.jsx"

export default function Home() {
  return (
    <>
     <Header/>
      <Outlet/>
    </>
  )
}
