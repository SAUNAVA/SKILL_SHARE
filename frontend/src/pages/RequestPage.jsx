import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';

const RequestSession = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [mentor, setMentor] = useState(null);
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        console.log(`Fetching mentor with ID: ${mentorId}`);
        const res = await axiosInstance.get(`/users/mentors/${mentorId}`);
        setMentor(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentor();
  }, [mentorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/users/sessions/request', {
        mentorId,
        topic,
        date,
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
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Request Session with {mentor.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Topic</label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Preferred Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Additional Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Anything the mentor should know..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestSession;
