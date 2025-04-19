import Sidebar from '../pages/Sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Content */}
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            My Profile
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Name:</strong>
              <span className="text-gray-800">{user?.name || '—'}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Email:</strong>
              <span className="text-gray-800">{user?.email || '—'}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Bio:</strong>
              <span className="text-gray-800">{user?.bio || '—'}</span>
            </div>
            {user && user.role === 'Learner' && (
              <div className="flex items-center">
                <strong className="w-32 text-gray-600">Want ot learn:</strong>
                <span className="text-gray-800">
                  {user?.skillstoLearn?.join(', ') || '—'}
                </span>
              </div>
            )}
            {user && user.role === 'Mentor' && (
              <div className="flex items-center">
                <strong className="w-32 text-gray-600">Skills:</strong>
                <span className="text-gray-800">
                  {user?.skillstoTeach?.join(', ') || '—'}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Location:</strong>
              <span className="text-gray-800">{user?.location || '—'}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Availability:</strong>
              <span className="text-gray-800">{user?.availability || '—'}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-32 text-gray-600">Role:</strong>
              <span className="text-gray-800">{user?.role || '—'}</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/profile-setup"
              className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;