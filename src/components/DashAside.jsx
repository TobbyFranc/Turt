import React from 'react'

const DashAside = () => {
  return (
    <div className='fixed max-w-[340px] right-0 top-16 hidden lg:block  bg-white h-[calc(100vh-64px)] overflow-y-scroll'>
        {/* make it on the right hand side */}
        {/* position nav on the left aside with toggle button to expand and collapse. Nav should include night/dark mode toggle and settings and logout  */}
        <div id='aside' className=" min-h-screen ">
            {/*  */}

            <div className="p-4">
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=1&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&src=Y19mZ2gydjN1bG9icG9AZ3JvdXAuY29t&color=%232952A3" style={{border: 'solid 1px #777'}} width="100%" height="600" frameBorder="0" scrolling="no" className='rounded-md'></iframe>
            </div>
            {/* Happening today */}
            <div className="w-full h-16 flex justify-between px-4 items-center border-t-2">
                <p className="text-md open-sans-400 text-[var(--primaryColor)] cursor-pointer">Happening Today</p>
                {/* Happening Today image */}
               <small className='text-gray-400 hover:text-[var(--primaryColor)] cursor-pointer'>see more</small>
            </div>
            <div className="p-4">
                {/* <iframe title="happening today widget" src="https://www.timeanddate.com/holidays/us/" frameBorder="0" scrolling="no" width="100%" height="200"></iframe> */}
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
            {/* upcoming events */}
            <div className="w-full h-16 flex justify-center items-center border-t-2">
                <p className="text-md open-sans-200 inter-500 text-[var(--primaryColor)] cursor-pointer">Upcoming Events</p>
                {/* Upcoming Events icon */}
                <img src="https://img.icons8.com/ios-filled/50/000000/event--v1.png" alt="Upcoming Events Logo" className="w-6 h-6 ml-2  text-[var(--primaryColor)]"/>
            </div>
            <div className="p-4">
                <iframe title="upcoming events widget" src="https://www.eventbrite.com/d/online/all-events/" frameBorder="0" scrolling="no" width="100%" height="200"></iframe>
            </div>
            {/*  */}
            {/* add weather widget */}
            <div className="w-full h-16 flex justify-center items-center border-t-2">
                <p className="text-md open-sans-200 inter-500 text-[var(--primaryColor)] cursor-pointer">Weather</p>
                {/* Weather image */}
                <img src="https://img.icons8.com/ios-filled/50/000000/partly-cloudy-day--v1.png" alt="Weather Logo" className="w-6 h-6 ml-2  text-[var(--primaryColor)]"/>
            </div>
            <div className="p-4">
                <iframe title="weather widget" src="https://weatherwidget.io/w/" frameBorder="0" scrolling="no" width="100%" height="200"></iframe>
            </div>
            {/* add motivational quote */}
            <div className="w-full h-16 flex justify-center items-center border-t-2">
                <p className="text-md open-sans-200 inter-500 text-[var(--primaryColor)] cursor-pointer">Community Notes</p>
                {/* Quote image */}
                <img src="https://img.icons8.com/ios-filled/50/000000/quote-left.png" alt="Quote Logo" className="w-6 h-6 ml-2  text-[var(--primaryColor)]"/>
            </div>
            <div className="p-4">
                <iframe title="motivational quote widget" src="https://www.brainyquotes.com/widget" frameBorder="0" scrolling="no" width="100%" height="200"></iframe>
            </div>
            {/* add a to-do list */}
            <div className="w-full h-16 flex justify-center items-center border-t-2">
                <p className="text-md open-sans-200 inter-500 text-[var(--primaryColor)] cursor-pointer">To-Do List</p>
                {/* To-Do List image */}
                <img src="https://img.icons8.com/ios-filled/50/000000/checklist--v1.png" alt="To-Do List Logo" className="w-6 h-6 ml-2  text-[var(--primaryColor)]"/>
            </div>
            <div className="p-4">
                <iframe title="to-do list widget" src="https://www.ticktick.com/widget" frameBorder="0" scrolling="no" width="100%" height="200"></iframe>
            </div>
            {/*  */}    

        </div>
    </div>
  )
}

export default DashAside