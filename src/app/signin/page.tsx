"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image"
// import { useRouter } from "next/navigation"
// import {toast} from "react-toastify"

const Page = () => {
//   const route = useRouter()
  //handling form submittion
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault() //prevents default form action (page refresh)
//     const formData = new FormData(e.currentTarget); //get form input values
//     const result = await login(formData); //calls server action

//     if(result.success){
//       localStorage.setItem("isAuthenticated","true");
//       route.push("/admin") //redirect to admin page on successful login
//     }else{
//       toast.error(result.message); //displays error notification
//     }
//   }
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")


const handleLogin = async (e:React.FormEvent) => {
  e.preventDefault()
  const res = await signIn("credentials",{email,password,redirect: false})
  if(!res?.error) window.location.href = "/"
}
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="shadow-md rounded-md p-8 bg-white mx-4">
            <form onSubmit={handleLogin}>
              {/* Logo & Title */}
              <div className="flex space-x-3 items-center justify-center mb-4">
                <Image src="/globe.svg" alt="logo" width={35} height={35} />
                <div className="text-2xl font-bold">MG Smart Trading</div>
              </div>
      
              {/* Welcome Message */}
              <div className="text-2xl text-gray-600">Welcome to MG Smart Trading! 👋</div>
              <div className="text-sm text-gray-400 mt-2">
                Please sign in to your account and start the adventure
              </div>
      
              {/* Form Fields */}
              <div className="flex flex-col space-y-4 mt-6">
                <label htmlFor="Email">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="username"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 rounded-md w-full"
                />
      
                <label htmlFor="Password">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
      
                <div className="text-gray-400 hover:text-primary hover:underline cursor-pointer">
                  Forgot password?
                </div>
      
                {/* Login Button */}
                <button
                  type="submit"
                  className="p-2 text-black bg-primary hover:bg-black hover:text-white rounded-md"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default Page