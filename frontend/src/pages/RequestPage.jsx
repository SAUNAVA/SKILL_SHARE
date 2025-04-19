import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';
import Sidebar from '../pages/Sidebar';
import Navbar from '../components/Navbar';

const RequestSession = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [mentor, setMentor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  // Fetch mentor info
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axiosInstance.get(`/users/mentors/${mentorId}`);
        setMentor(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentor();
  }, [mentorId]);

  // Fetch mentor availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axiosInstance.get(`/users/${mentorId}/availability`);
        setAvailability(res.data);
      } catch (err) {
        console.error('Failed to fetch availability', err);
      }
    };
    fetchAvailability();
  }, [mentorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [day, time] = selectedSlot.split('|'); // assuming slot format: "Monday|10:00"
    try {
      await axiosInstance.post('/users/sessions/request', {
        mentorId,
        topic,
        day,
        date,
        time,
        note,
      });
      alert('Session request sent!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to send request');
      console.error(err);
    }
  };

  if (!mentor) return <p>Loading mentor details...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Make Navbar sticky */}
        <Navbar className="sticky top-0 z-10 bg-white shadow-md" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Request Session with {mentor.name}
            </h2>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">{mentor.bio}</p>
              <div className="mb-4">
                <strong>Skills:</strong>{' '}
                {mentor.skillstoTeach?.slice(0, 4).join(', ') || 'N/A'}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">Topic</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Enter the topic for the session"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Select Available Slot</label>
                {availability.length === 0 ? (
                  <p className="text-sm text-gray-500">No available slots from this mentor</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availability.map((slot, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="radio"
                          name="slot"
                          value={`${slot.day}|${slot.startTime}`}
                          checked={selectedSlot === `${slot.day}|${slot.startTime}`}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                        />
                        <span>
                          {slot.day} @ {slot.startTime} - {slot.endTime}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Additional Note</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Anything the mentor should know..."
                />
              </div>

              <button
                type="submit"
                disabled={!selectedSlot}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                Send Request
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestSession;