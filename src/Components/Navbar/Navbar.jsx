import React, { useState, useEffect } from 'react'
import { FaCalendarCheck, FaBell, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Navbar = ({ showLogin, setShowLogin, setActiveTab, isLogin, setIsLogin }) => {
    const [user, setUser] = useState('')
    const [username, setUserName] = useState("")
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        const userDetail = JSON.parse(localStorage.getItem("user")) // null
        if (userDetail) {
            userDetail.forEach((detail) => {
                if (detail.login) {
                    setUser(detail.userType);
                    setUserName(detail.emailId)
                    setIsLogin(detail.login)
                }
            })
        }
    }, [user])


    const logOut = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        setIsLogin(!isLogin)
        if (user) {
            user.forEach((detail) => {
                if (detail.emailId === username) {
                    detail.login = !detail.login
                }
            })
        }
        localStorage.setItem("user", JSON.stringify(user))
        location.pathname = "/"
    }

    return (
        <>
            <nav className="bg-white shadow-md z-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center cursor-pointer">
                                <FaCalendarCheck className="text-blue-500 text-2xl mr-2" />
                                <span className="text-xl font-bold text-gray-800">MediSchedule</span>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="flex space-x-4 items-center">
                                <NavLink to='/' className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">
                                    Home
                                </NavLink>
                                <NavLink to="patient" className={`text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer ${user === 'patient' && isLogin ? "" : "hidden"}`}>
                                    Patient view
                                </NavLink>
                                <NavLink to="doctor" className={`text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer ${user === 'doctor' && isLogin ? "" : "hidden"}`}>
                                    Doctor view
                                </NavLink>
                                <button
                                    className={`text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer ${isLogin ? "hidden" : ""}`}
                                    onClick={() => {
                                        setActiveTab('login')
                                        setShowLogin(!showLogin)
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${isLogin ? "hidden" : ""}`}
                                    onClick={() => {
                                        setActiveTab('register');
                                        setShowLogin(!showLogin)
                                    }}
                                >
                                    Get Started
                                </button>
                                <div className={`flex items-center space-x-4 ${isLogin ? "" : "hidden"}`}>
                                    <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                        <FaBell />
                                    </button>
                                    <div className='flex flex-col items-end'>
                                        <button className="flex items-center p-2 cursor-pointer mt-10 bg-white z-10" onClick={() => {
                                            setIsVisible(!isVisible)
                                        }}>
                                            <FaUserCircle className="text-gray-400 text-2xl mr-2" />
                                            <span className="text-sm font-medium">{username}</span>
                                        </button>
                                        <button
                                            className={`flex items-center justify-center p-2 cursor-pointer w-25 rounded-b-xl bg-white transition duration-500 linear ${isVisible ? "opacity-100" : "-translate-y-10 opacity-0"}`}
                                            onClick={() => logOut()}
                                        >
                                            Log-out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
