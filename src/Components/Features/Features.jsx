import React from 'react'
import {FaClock, FaBell, FaChartLine} from 'react-icons/fa'

const Features = () => {
    const features = [
        {
            icon: <FaClock className="text-blue-500 text-2xl" />,
            title: "24/7 Online Booking",
            description: "Patients can book appointments anytime, reducing phone calls to your clinic."
        },
        {
            icon: <FaBell className="text-blue-500 text-2xl" />,
            title: "Automated Reminders",
            description: "Reduce no-shows with SMS and email reminders for upcoming appointments."
        },
        {
            icon: <FaChartLine className="text-blue-500 text-2xl" />,
            title: "Real-Time Analytics",
            description: "Track appointment trends and clinic performance with detailed reports."
        }
    ];
    return (
        <div>
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Designed for Clinics and Patients
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            A comprehensive solution that benefits both healthcare providers and their patients.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
