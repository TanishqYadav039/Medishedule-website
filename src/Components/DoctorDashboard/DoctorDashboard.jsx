import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUserCircle, FaBell, FaSearch, FaChevronRight, FaStethoscope, FaClock, FaUserInjured, FaNotesMedical } from 'react-icons/fa';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [medicalNotes, setMedicalNotes] = useState('');
  const [appointmentData, setAppointmentData] = useState([])


  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("allAppointmentsList"))
    if(data){
      setAppointmentData(data)
    }
  },[])

  // Mock data
  const appointments = {
    today: appointmentData,
    upcoming: [
      { id: 5, patient: 'Robert Wilson', date: '2023-06-16', time: '9:30 AM', type: 'Consultation' },
      { id: 6, patient: 'Lisa Miller', date: '2023-06-16', time: '11:00 AM', type: 'Follow-up' },
      { id: 7, patient: 'David Taylor', date: '2023-06-17', time: '10:15 AM', type: 'New Patient' }
    ],
    past: [
      { id: 8, patient: 'James Anderson', date: '2023-06-14', time: '9:00 AM', type: 'Follow-up', notes: 'Prescription refill' },
      { id: 9, patient: 'Jennifer Thomas', date: '2023-06-13', time: '2:30 PM', type: 'Consultation', notes: 'Lab tests ordered' }
    ]
  };

  const stats = [
    { name: 'Today Appointments', value: appointments.today.length, icon: FaCalendarAlt },
    { name: 'Waiting Patients', value: 2, icon: FaUserInjured },
    { name: 'Available Slots', value: 3, icon: FaClock },
    { name: 'Completed This Week', value: 8, icon: FaNotesMedical }
  ];

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAddNotes = () => {
    setShowNotesModal(true);
    setMedicalNotes(selectedAppointment.notes || '');
  };

  const handleSaveNotes = () => {
    // In a real app, you would save to API/database here
    setSelectedAppointment({ ...selectedAppointment, notes: medicalNotes });
    setShowNotesModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaStethoscope className="text-blue-600 text-2xl mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <FaBell />
            </button>
            <div className="flex items-center">
              <FaUserCircle className="text-gray-400 text-2xl mr-2" />
              <span className="text-sm font-medium">Dr. Sarah Johnson</span>
            </div>
          </div>
        </div>
      </header> */}

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 flex-col sm:flex-row">
            <button
              onClick={() => setActiveTab('today')}
              className={`${activeTab === 'today' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Today's Schedule
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${activeTab === 'upcoming' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${activeTab === 'past' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past Appointments
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {appointments[activeTab].map((appointment) => (
              <li key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserCircle className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patient}
                        {appointment.date && (
                          <span className="ml-2 text-gray-500">
                            ({new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.time} • {appointment.type}
                        {appointment.duration && ` • ${appointment.duration}`}
                      </div>
                      {appointment.notes && (
                        <div className="mt-1 text-xs text-gray-500">
                          <FaNotesMedical className="inline mr-1" />
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {appointment.status && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    )}
                    <button 
                      onClick={() => handleViewDetails(appointment)}
                      className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Empty State */}
          {appointments[activeTab].length === 0 && (
            <div className="text-center py-12">
              <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'today' 
                  ? "You don't have any appointments scheduled for today." 
                  : activeTab === 'upcoming' 
                    ? "No upcoming appointments." 
                    : "No past appointments found."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedAppointment.patient}</h2>
                  <div className="mt-1 text-sm text-gray-500">
                    {selectedAppointment.date 
                      ? `${new Date(selectedAppointment.date).toLocaleDateString()} at ${selectedAppointment.time}`
                      : selectedAppointment.time}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Appointment Type</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedAppointment.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedAppointment.duration || '30 min'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedAppointment.status || 'confirmed'}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Medical Notes</h3>
                <div className="mt-1 p-3 bg-gray-50 rounded-md min-h-20">
                  {selectedAppointment.notes || 'No notes available'}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={handleAddNotes}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add/Edit Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">Medical Notes for {selectedAppointment.patient}</h2>
                <button 
                  onClick={() => setShowNotesModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>
              
              <div className="mt-4">
                <textarea
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your medical notes here..."
                />
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
