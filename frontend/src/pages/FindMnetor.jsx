// pages/FindMentor.jsx

import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const FindMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const res = await axiosInstance.get('/users/mentors');
                setMentors(res.data);
            } catch (err) {
                console.error('Error fetching mentors:', err);
            }
        };

        fetchMentors();
    }, []);

    const filteredMentors = mentors.filter((mentor) =>
        search === '' || mentor.skillstoTeach?.some((skill) =>
            skill.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow mt-6 flex-grow">
                <h2 className="text-2xl font-semibold mb-4">🔍 Find a Mentor</h2>

                <input
                    type="text"
                    placeholder="Search by skill..."
                    className="w-full p-3 mb-6 border rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {filteredMentors.length === 0 ? (
                    <p>No mentors found matching your search.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMentors.map((mentor) => (
                            <div
                                key={mentor._id}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between h-full"
                                // onClick={()=> navigate(`/mentor/${mentor._id}`) }
                            >
                                <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>
                                <div className="mb-4">
                                    <strong>Skills:</strong>{' '}
                                    {mentor.skillstoTeach?.slice(0, 4).join(', ') || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500 mb-4">
                                    {mentor.experience || 'Experience not listed / Feature coming soon'}
                                </div>
                                <button
                                    className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    onClick={() => navigate(`/request-session/${mentor._id}`) }
                                >
                                    Request Session
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindMentor;
