// pages/ProfileSetup.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {  updateUserProfile } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skillstoLearn: '',
    skillstoTeach:'',
    location: '',
    availability: ''
  });

  useEffect(() => {
    
    if (user) { 
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skillstoLearn: user.skillstoLearn?.join(', ') || '',
        skillstoTeach: user.skillstoTeach?.join(', ') || '',
        location: user.location || '',
        availability: user.availability || '',
        
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skillstoLearn: formData.skillstoLearn.split(',').map(skill => skill.trim()),
      skillstoTeach: formData.skillstoTeach.split(',').map(skill => skill.trim())
    };
    
    dispatch(updateUserProfile(updatedData)).then(() => {
      
      navigate('/dashboard');
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          className="w-full border p-2 rounded"
        />
        
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Flexible">Flexible</option>
        </select>
        {/* <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Role</option>
          <option value="Mentor">Mentor</option>
          <option value="Learner">Learner</option>
        </select> */}
        {user.role==='Mentor' && (
          <input
            name="skillstoTeach"
            value={formData.skillstoTeach}
            onChange={handleChange}
            placeholder="Skills to Teach (comma-separated)"
            className="w-full border p-2 rounded"
          />
        )}
        {user.role==='Learner' && (
          <input
            name="skillstoLearn"
            value={formData.skillstoLearn}
            onChange={handleChange}
            placeholder="Skills to Learn (comma-separated)"
            className="w-full border p-2 rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
