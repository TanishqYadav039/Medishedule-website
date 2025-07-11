import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUserCircle, FaBell, FaSearch, FaChevronRight, FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Mock data
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: ['Mon', 'Wed', 'Fri'] },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', available: ['Tue', 'Thu', 'Sat'] },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', available: ['Mon', 'Wed', 'Fri'] }
  ];

  // const appointments = [
  //   // { id: 1, doctor: 'Dr. Sarah Johnson', date: '2023-06-15', time: '10:00 AM', status: 'confirmed' },
  //   // { id: 2, doctor: 'Dr. Michael Chen', date: '2023-06-18', time: '2:30 PM', status: 'pending' },
  //   // { id: 3, doctor: 'Dr. Emily Wilson', date: '2023-06-20', time: '9:00 AM', status: 'cancelled' }
  // ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];

  const confirmAppointment = () => {
    if (selectedTime !== null && selectedDate !== "") {
      const newList = [...appointments, { id: uuidv4(), doctor: selectedDoctor.name, date: selectedDate, time: selectedTime, status: 'pending' }];
      setAppointments(newList);
      localStorage.setItem('allAppointmentsList', JSON.stringify(newList));
    }
  }

  useEffect(() => {
    console.log(appointments)
  }, [])

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem("allAppointmentsList"));
    if (appointments) {
      setAppointments(appointments);
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-600 text-2xl mr-2" />
            <h1 className="text-xl font-bold text-gray-800">MediSchedule</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <FaBell />
            </button>
            <div className="flex items-center">
              <FaUserCircle className="text-gray-400 text-2xl mr-2" />
              <span className="text-sm font-medium">Patient Name</span>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            New Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 flex-col sm:flex-row">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${activeTab === 'upcoming' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 w-full font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${activeTab === 'past' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 w-full font-medium text-sm`}
            >
              Past Appointments
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`${activeTab === 'cancelled' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 w-full font-medium text-sm`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.doctor}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {appointment.status}
                    </span>
                    <button className="ml-4 text-blue-600 hover:text-blue-800">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments."
                : activeTab === 'past'
                  ? "No past appointments found."
                  : "No cancelled appointments."}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Book New Appointment</h2>

              {/* Step 1: Select Doctor */}
              {!selectedDoctor && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Select a Doctor</h3>
                  <div className="mb-4">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md"
                        placeholder="Search doctors..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor)}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUserCircle className="text-blue-600 text-xl" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-gray-500">{doctor.specialty}</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {doctor.available.map(day => (
                                <span key={day} className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                                  {day}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Date */}
              {selectedDoctor && !selectedDate && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      ← Back
                    </button>
                    <h3 className="text-lg font-medium text-gray-800">Select Date for {selectedDoctor.name}</h3>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const isAvailable = selectedDoctor.available.includes(
                        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
                      );

                      return (
                        <button
                          key={i}
                          disabled={!isAvailable}
                          onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                          className={`py-2 rounded-full ${isAvailable
                            ? 'hover:bg-blue-50 hover:text-blue-700'
                            : 'text-gray-300 cursor-not-allowed'}`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Select Time */}
              {selectedDoctor && selectedDate && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setSelectedDate('')}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      ← Back
                    </button>
                    <h3 className="text-lg font-medium text-gray-800">
                      Select Time Slot on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className="border border-gray-200 rounded-md py-2 px-4 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setSelectedDoctor(null);
                        setSelectedDate('');
                        setShowBookingModal(false);
                        setSelectedTime(null)
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle booking confirmation
                        confirmAppointment();
                        setSelectedDoctor(null);
                        setSelectedDate('');
                        setShowBookingModal(false);
                        setSelectedTime(null)
                      }}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
