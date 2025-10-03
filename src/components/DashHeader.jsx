import React from 'react'
import Turt from "../assets/Turt.png"

const DashHeader = () => {
  return (
    <div>
        <div className="fixed bg-white z-10 w-full top-0">
            <div className="w-full flex justify-between p-8 items-center h-16 border-b shadow-b-md border-b-gray-300">
                <div id="logo" className="logo flex items-center">
                    {/* add a turtle logo */}
                    <img src={Turt} alt="Turtle Logo" className="w-16 h-16 mr-2"/>
                    <div className="flex items-center">
                        <p className="text-3xl inter-500 text-slate-500 cursor-pointer">Turtura</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {/* search with embedded icon and a submit button */}
                    <div className="hidden md:flex items-center border border-gray-300 rounded-md px-2 py-1 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="text" placeholder="Search for events, places, or activities" className="ml-2 outline-none border-none focus:ring-0"/>
                        <button className="bg-[var(--accentColor)] hover:bg-yellow-600 text-white px-4 py-2 rounded-md ml-2"><a href="/LocationSearch">Search</a></button>
                    </div>




                    {/* Icons for notifications darkmode toggle button and language change select  */}
                    <div className="">
                        <div className="flex space-x-4 items-center">


                            <button className="text-[var(--primaryColor)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3.5 3.5 0 11-7 0m7 0a3.5 3.5 0 00-7 0" />
                                </svg>
                            </button>
                            <select name="language" id="language" className=" rounded-md px-2 py-1 focus:outline-none  cursor-pointer">
                                <option value="en">EN</option>
                                <option value="es">ES</option>
                                <option value="fr">FR</option>
                                <option value="de">DE</option>
                            </select>
                        </div>
                    </div>
                    {/* user profile icon with name and location and online indicator */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-[var(--primaryColor)]">John Doe</span>
                                <span className="text-sm text-gray-500">New York, USA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashHeader