import React from 'react'

const Login = () => {
  return (
    <div className="flex place-items-stretch h-screen">
        {/* Login page */}
                <div className="m-auto w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
            <h1 className="text-2xl font-bold text-center text-[var(--primaryColor)]">Create an Account</h1>
            <form action="" className="space-y-6">
                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block text-gray-600">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[var(--primaryColor)] focus:ring-[var(--primaryColor)] focus:outline-none"/>
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[var(--primaryColor)] focus:ring-[var(--primaryColor)] focus:outline-none"/> 
                </div>
                <button className="block w-full p-3 text-center rounded-sm text-white bg-[var(--accentColor)] hover:bg-yellow-600"><a href="/Dashboard">Login</a></button>
            </form>
        </div>
        {/*  */}
            <p className="text-xs text-center sm:px-6 text-gray-600">Don't have an account? 
                <a href="/Signup" className="underline text-[var(--primaryColor)] font-semibold"> Signup</a>
            </p>
        <div className="hidden lg:block w-1/2 h-screen bg-[var(--backgroundColor)]">
            {/* image of people traveling */}
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd      lfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Travel" className="w-full h-full object-cover rounded-l-xl"/> 
            </div>
        </div>
        {/*  */}
    </div>
  )
}

export default Login