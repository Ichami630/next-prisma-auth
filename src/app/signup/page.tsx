"use client"
import { useState } from "react";
import Image from "next/image"
import { toast } from "react-toastify";

const Page = () => {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [name,setName] = useState("")
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
      const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json(); // Parse response safely

      if (data.success) {
          toast.success("Registration successful!");

          setTimeout(() => {
              window.location.href = "/signin";
          }, 1500);
      } else {
          toast.error(data.message);
      } 
};

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="shadow-md rounded-md p-8 bg-white mx-4">
            <form onSubmit={handleSignup}>
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
                <label htmlFor="username">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 rounded-md w-full"
                />
                <label htmlFor="name">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border p-2 rounded-md w-full"
                />
      
                <label htmlFor="password">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
      
                {/* Login Button */}
                <button
                  type="submit"
                  className="p-2 text-black bg-amber-300 cursor-pointer hover:bg-black hover:text-white rounded-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default Page