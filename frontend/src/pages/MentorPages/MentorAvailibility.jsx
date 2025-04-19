import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailability, addSlot, removeSlot, updateAvailability } from '../../features/mentorSlice';
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar';

const MentorAvailibility = () => {
    const dispatch = useDispatch();
    const { availability, loading, error } = useSelector((state) => state.mentorSessions);

    const [day, setDay] = useState('');
    const [sttime, setstTime] = useState('');
    const [endtime, setendTime] = useState('');

    useEffect(() => {
        dispatch(fetchAvailability());
    }, [dispatch]);

    const handleAddSlot = () => {
        if (!day || !sttime || !endtime) return;
        dispatch(addSlot({ day, startTime: sttime, endTime: endtime }));
        setDay('');
        setstTime('');
        setendTime('');
    };

    const handleRemoveSlot = (index) => {
        dispatch(removeSlot(index));
    };

    const handleSaveAvailability = () => {
        dispatch(updateAvailability(availability));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>

                        <div className="flex gap-4 mb-6">
                            <select
                                className="border rounded px-3 py-2"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            >
                                <option value="">Select Day</option>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                                    (d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    )
                                )}
                            </select>

                            <input
                                type="time"
                                className="border rounded px-3 py-2"
                                value={sttime}
                                onChange={(e) => setstTime(e.target.value)}
                            />
                            <input
                                type="time"
                                className="border rounded px-3 py-2"
                                value={endtime}
                                onChange={(e) => setendTime(e.target.value)}
                            />

                            <button
                                onClick={handleAddSlot}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Slot
                            </button>
                        </div>

                        {availability.length > 0 ? (
                            <ul className="space-y-2 mb-6">
                                {availability.map((slot, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border rounded p-3 bg-white shadow-sm"
                                    >
                                        <span>
                                            {slot.day} @ {slot.startTime} - {slot.endTime}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveSlot(index)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-6 text-gray-600">No slots added yet.</p>
                        )}

                        <button
                            onClick={handleSaveAvailability}
                            disabled={loading}
                            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MentorAvailibility;