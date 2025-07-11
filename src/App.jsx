import { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { Navbar, Features, Login, Footer, Testomonial } from './Components'
import { useLocation, Outlet } from 'react-router';


export default function App() {
    const [activeTab, setActiveTab] = useState('login');
    const [accountType, setAccountType] = useState('patient');
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const location = useLocation()


    if (showLogin) {
        return <Login activeTab={activeTab} accountType={accountType} setAccountType={setAccountType} setActiveTab={setActiveTab} showLogin={showLogin} setShowLogin={setShowLogin} />
    } 


    return (
        <>
            <Navbar setShowLogin={setShowLogin} showLogin={showLogin} setActiveTab={setActiveTab} isLogin={isLogin} setIsLogin={setIsLogin} />
            {location.pathname === '/' && <div className="min-h-screen bg-blue-500">
                <div className="gradient-bg text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                            <div className="mb-12 lg:mb-0">
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                                    Smart Appointment System for Modern Clinics
                                </h1>
                                <p className="text-xl text-blue-50 max-w-3xl mb-8">
                                    Streamline your clinic's scheduling process with our intuitive platform connecting doctors and patients.
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        className={`bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg transition-all hover:cursor-pointer ${isLogin ? "hidden" : ""}`}
                                        onClick={() => {
                                            setActiveTab('login');
                                            setShowLogin(!showLogin)
                                        }}
                                    >
                                        Patient Login
                                    </button>
                                    <button
                                        className={`bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all cursor-pointer ${isLogin ? "hidden" : ""}`}
                                        onClick={() => {
                                            setActiveTab('login');
                                            setAccountType('doctor');
                                            setShowLogin(!showLogin)
                                        }}
                                    >
                                        Doctor Login
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="hero-image h-80 w-full rounded-xl shadow-2xl" style={{
                                    backgroundImage: "url(https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 p-3 rounded-full mr-3">
                                            <FaCalendarCheck className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Appointments Today</p>
                                            <p className="font-bold text-gray-800">{new Date().getDate()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Features />


                <Testomonial />
            </div>
            }

            <Outlet />
            <Footer />

        </>
    );
}
