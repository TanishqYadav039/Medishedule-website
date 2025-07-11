import React, { useEffect } from 'react'
import { FaUserMd, FaUserInjured, FaGoogle, FaApple } from 'react-icons/fa'
import { useState } from 'react'

const Login = ({ activeTab, accountType, setActiveTab, setAccountType, showLogin, setShowLogin }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFill, setIsFill] = useState(false)
  const [detail, setDetail] = useState([])

  const loggedIn = () => {
    if (email.trim() === "" && password.trim() === "") {
      return setIsFill(false)
    } else {
      setIsFill(true)
    }
    detail.forEach((detail) => {
      if (detail.emailId === email && detail.userPass === password) {
        detail.login = !detail.login
        setAccountType(detail.userType)
        setShowLogin(!showLogin)
      }
    })
    localStorage.setItem("user", JSON.stringify(detail))
  }

  const userDetail = () => {
    // if (detail.length > 0) {
    //   detail.forEach((detail) => {
    //     if (detail.emailId === email && detail.userPass === password)
    //       return alert(`Account has been created already...`)
    //   })
    // }
    if (email !== "" && password !== "") {
      const accountList = [...detail,{
        userType: accountType,
        emailId: email.trim(),
        userPass: password.trim(),
        login: false
      }]
      localStorage.setItem("user", JSON.stringify(accountList))
      const anotherdetail = JSON.parse(localStorage.getItem("user"))
      console.log(anotherdetail)
      console.log(accountList);
      setDetail(accountList)
      alert(`Your account created successfully...`)
    }
  }

  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem("user"))
    if (detail) {
      setDetail(detail)
    }
  }, [detail])


  return (
    <div>
      {activeTab && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-3 px-4 text-center font-medium w-1/2 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('login')}
                >
                  Sign In
                </button>
                <button
                  className={`py-3 px-4 text-center font-medium w-1/2 ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>

              {/* Login Form */}
              {activeTab === 'login' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required={!isFill}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required={!isFill}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</button>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
                    onClick={() => {
                      loggedIn()
                    }}
                  >
                    Sign In
                  </button>
                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">or continue with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4">
                      <FaGoogle className="text-red-500" />
                      <span>Google</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4">
                      <FaApple />
                      <span>Apple</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <div className="flex">
                      <button
                        className={`flex-1 py-2 px-4 border border-gray-300 rounded-l-md ${accountType === 'patient' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setAccountType('patient')}
                      >
                        <FaUserInjured className="inline mr-2" />
                        Patient
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 border border-gray-300 rounded-r-md ${accountType === 'doctor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setAccountType('doctor')}
                      >
                        <FaUserMd className="inline mr-2" />
                        Doctor
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Create a password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {accountType === 'doctor' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select specialization</option>
                          <option value="cardiology">Cardiology</option>
                          <option value="dermatology">Dermatology</option>
                          <option value="neurology">Neurology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medical License</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter license number"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required={true}
                    />
                    <label className="ml-2 block text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    onClick={() => userDetail()}
                  >
                    Create Account
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      className="text-blue-600 hover:text-blue-500"
                      onClick={() => setActiveTab('login')}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
