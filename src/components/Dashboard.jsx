
import DashAside from './DashAside'
import DashHeader from './DashHeader'
import DashMain from './DashMain'
import Dashnav from './Dashnav'

const Dashboard = () => {
  return (
    <div className='relative'>
        <div className="">
            <DashHeader />
        </div>
        <div id='rem' className="flex w-full relative open-sans-200">
            <div id='dana' className=" fixed left-0 mt-16 hidden lg:block w-[20%] max-w-[320px] h-screen border-r-2"><Dashnav /></div>
            <div className="w-full mt-16 gap-4 flex justify-between  lg:mx-auto lg:pl-[20%] lg:pr-[350px]">
                <div className=" w-full "><DashMain /></div>
                <div className=""><DashAside /></div>
            </div>
        </div>
        {/* an AI messaging box located in the bottom right corner */}
        <div className="fixed bottom-8 right-8">
            <button className="bg-[var(--accentColor)] hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg">
                <img src="https://img.icons8.com/ios-filled/50/000000/chat--v1.png" alt="Chat Icon" className="w-6 h-6"/>
            </button>
        </div>
        {/* a chat box with ai o the bottom right corner */}
        <div className="fixed bottom-20 right-8  w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4  bg-[var(--backgroundColor)] p-4 rounded-t-lg">
                <h2 className="text-lg font-medium text-[var(--primaryColor)]">AI Assistant</h2>
                <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col h-full p-4">
                <div className="flex-grow overflow-y-auto mb-4">
                    {/* chat messages */}
                    <div className="mb-2">
                        <p className="text-sm text-gray-600"><span className="font-medium text-[var(--primaryColor)]">User:</span> Hello, how can you assist me today?</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-gray-600"><span className="font-medium text-[var(--primaryColor)]">AI:</span> Hi! I can help you with information about local events, weather updates, and more. What do you need assistance with?</p>
                    </div>
                </div>
                <form className="flex">
                    <input type="text" placeholder="Type your message..." className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-[var(--primaryColor)] focus:border-[var(--primaryColor)]"/>
                    <button type="submit" className="bg-[var(--accentColor)] hover:bg-yellow-600 text-white p-2 rounded-r-lg">Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Dashboard