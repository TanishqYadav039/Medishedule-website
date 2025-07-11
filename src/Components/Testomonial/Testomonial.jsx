import React from 'react'

const Testomonial = () => {
    const testimonials = [
        {
            name: "Dr. Sarah Johnson",
            role: "Cardiologist",
            quote: "MediConnect has reduced our administrative workload by 40% and improved patient satisfaction."
        },
        {
            name: "Michael Rodriguez",
            role: "Clinic Manager",
            quote: "Automated reminders reduced our no-show rate from 15% to just 4%."
        },
        {
            name: "Emma Chen",
            role: "Patient",
            quote: "Booking appointments has never been easier without needing to call."
        }
    ];
    return (
        <div>
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Trusted by Clinics Nationwide
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-600 text-xl">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-blue-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testomonial
