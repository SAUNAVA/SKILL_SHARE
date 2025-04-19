import Sidebar from '../pages/Sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              My Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Details */}
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
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
                  <div className="flex items-center">
                    <strong className="w-32 text-gray-600">Location:</strong>
                    <span className="text-gray-800">{user?.location || '—'}</span>
                  </div>
                  <div className="flex items-center">
                    <strong className="w-32 text-gray-600">Role:</strong>
                    <span className="text-gray-800">{user?.role || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Skills or Learning Goals */}
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {user?.role === 'Learner' ? 'Learning Goals' : 'Skills to Teach'}
                </h3>
                <div className="space-y-2">
                  {user?.role === 'Learner' ? (
                    <span className="text-gray-800">
                      {user?.skillstoLearn?.length > 0
                        ? user.skillstoLearn.join(', ')
                        : 'No skills added yet.'}
                    </span>
                  ) : (
                    <span className="text-gray-800">
                      {user?.skillstoTeach?.length > 0
                        ? user.skillstoTeach.join(', ')
                        : 'No skills added yet.'}
                    </span>
                  )}
                </div>
              </div>
              
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8 text-center">
              <Link
                to="/profile-setup"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;