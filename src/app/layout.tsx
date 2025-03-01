
import "./globals.css"
import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Props{
  children: ReactNode
}

const layout = ({children}:Props) => {
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen">
          {children}
        </div>
        <ToastContainer/>
      </body>
    </html>
  )
}

export default layout