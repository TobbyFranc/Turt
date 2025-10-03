import React from 'react'

const DashMain = () => {
  return (
    <div>
        {/* position nav on the left aside with toggle button to expand and collapse. Nav should include night/dark mode toggle and settings and logout  */}
        <div id='main' className="w-full min-h-screen mt-8 border-r-[1px] p-4 border-gray-300">
            {/* user card showing image, welcome message, location, badge  */}
            <div className="w-full mx-auto flex justify-between items-center p-4 shadow-lg md:hidden">
                <div className="flex gap-4 items-center">
                    {/* <img src="https://img.icons8.com/ios-filled/50/000000/user--v1.png" alt="User Logo" className="w-32 h-32 mr-4 border-2 text-[var(--primaryColor)] rounded-md"/> */}
                    <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="User Profile" className="w-32 h-32 rounded-md object-cover" />
                    <div className="flex flex-col">
                        <span className="font-medium text-[var(--primaryColor)] text-lg">Welcome back, John!</span>
                        <span className="text-sm text-gray-500">
                            {/* location icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            
                            New York, USA
                        </span>
                        <span className="text-sm text-gray-500">
                            {/* location icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            
                            Green/Yellow/Red Zone 
                            {/* information icon with toltip on hover*/}
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block ml-1 text-gray-400 cursor-pointer" title="Green: Safe, Yellow: Caution, Red: High Alert">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                {/* tooltip */}
                                <div className="tooltip hidden absolute bg-gray-700 text-red-500 text-xs rounded py-1 px-2 mt-1">
                                    Green: Safe, Yellow: Caution, Red: High Alert
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-full">
                    <span className="text-sm font-medium">Pro Member</span>
                </div>
            </div>
            {/* Notification banner for cultural alerts stating the level of threat or concern */}
            <div className="m-4 p-2 max-w-[70%] mx-auto h-16 flex justify-center items-start mb-4 bg-[var(--alertColor)] ">
                {/* warning icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 cursor-pointer text-[var(--errorColor)] ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-sm inter-500 text-[var(--primaryColor)] cursor-pointer rounded-md">Eke Market Day is today! You can have the best of foods at the market today.</p>
            </div>
            {/* Map of current location */}
            <div className="w-[90%] mx-auto h-64 flex justify-center items-center border-b-2">
                <iframe title="map widget" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193571.4384345092!2d-74.1180866877759!3d40.70582544216244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b4b6b5e8a7%3A0x4c5e8f8f8f8f8f8f!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" className='rounded-md'></iframe>
            </div>


            {/* main content area */}
            <div className="p-8">
                <h1 className="text-xl font-semibold text-[var(--primaryColor)] mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 1</h2>
                        <p className="text-gray-600">This is some content for card 1.</p>
                    </div>
                    {/* card 2 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 2</h2>
                        <p className="text-gray-600">This is some content for card 2.</p>
                    </div>
                    {/* card 3 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 3</h2>
                        <p className="text-gray-600">This is some content for card 3.</p>
                    </div>
                    {/* card 4 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 4</h2>
                        <p className="text-gray-600">This is some content for card 4.</p>
                    </div>
                    {/* card 5 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 5</h2>
                        <p className="text-gray-600">This is some content for card 5.</p>
                    </div>
                    {/* card 6 */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Card 6</h2>
                        <p className="text-gray-600">This is some content for card 6.</p>
                    </div>
                </div>
            </div>
            {/*  */}{/*  */}

            {/* add a Did you know? slider card contents */}
            <div className="p-8 border-t-2">
                <h1 className="text-xl font-semibold text-[var(--primaryColor)] mb-4">Did You Know?</h1>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Cultural Fact 1 - Tailored to location, but users can change to preferred location- There will also be buttton to play culture games where questions can be asked and your score accumulates and helps you get ranked</h2>
                    <p className="text-gray-600">In Japan, it is customary to bow when greeting someone as a sign of respect.</p>
                </div>
            </div>
            {/*  */}{/* list of happenings today */}
            <div className="p-8 border-t-2">
                <h1 className="text-xl font-semibold text-[var(--primaryColor)] mb-4">Happenings Today</h1>
                {/* list of happenings today */}
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Community Meetup</h2>
                        <p className="text-gray-600">Join us for a community meetup at the central park at 5 PM.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Art Exhibition</h2>
                        <p className="text-gray-600">Explore local art at the downtown gallery from 10 AM to 6 PM.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-medium text-[var(--primaryColor)] mb-2">Farmers Market</h2>
                        <p className="text-gray-600">Fresh produce and handmade goods at the farmers market from 8 AM to 2 PM.</p>
                    </div>
                </div>
            </div>
            {/*  */}


        </div>
    </div>
  )
}

export default DashMain