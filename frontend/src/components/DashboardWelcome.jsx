import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions } from '../features/sessionSlice';
// import { Card, CardContent } from '@/components/ui/card';
import { fetchSessionRequests } from '../features/mentorSlice';
import { Link } from 'react-router-dom';

const DashboardWelcome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sessions, loading } = useSelector((state) => state.session);
  const { requests } = useSelector((state) => state.mentorSessions)

  useEffect(() => {
    if (user?.role === 'Mentor') {
      dispatch(fetchSessionRequests());
    } else {
      dispatch(fetchSessions());
    }
  }, [dispatch, user]);
  const acceptedSessions = sessions.filter(
    (session) => session.status === "accepted"
  );

  const upcomingSessions = [...acceptedSessions]
    .filter((session) => new Date(session.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentActivity = sessions
    .slice()
    .reverse()
    .slice(0, 5);

  const renderStatCard = (title, value, color = 'bg-white') => (
    <div
      className={`flex-1 p-6 rounded-2xl shadow ${color} transition-transform transform hover:scale-105`}
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-extrabold mt-3 text-gray-900">{value}</p>
      </div>
    </div>
  );
  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading dashboard data...</p>;
  }

  // ---------------------------
  // Calculate stats based on role
  // ---------------------------
  let pending = 0;
  let accepted = 0;
  // let completed = 0;

  if (user?.role === 'Mentor') {
    pending = requests.filter((r) => r.status === 'pending').length;
    accepted = requests.filter((r) => r.status === 'accepted').length;
    // completed = requests.filter((r) => r.status === 'completed').length;
  } else if (user?.role === 'Learner') {
    pending = sessions.filter((r) => r.status === 'pending').length;
    accepted = sessions.filter((r) => r.status === 'accepted').length;
    // completed = sessions.filter((r) => r.status === 'completed').length;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Welcome back, {user?.name} 👋</h2>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: !user?.isProfileComplete ? "50%" : "100%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {!user?.isProfileComplete ? "Please complete your profile to get better matches" : "Role: " + user?.role}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex flex-row gap-6">
          {renderStatCard('Pending Sessions', pending, 'bg-yellow-100')}
          {renderStatCard('Accepted Sessions', accepted, 'bg-green-100')}
          {/* {renderStatCard('Completed Sessions', completed, 'bg-blue-100')} */}
        </div>



        {/* Quick Access */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          {user?.role === "Learner" && (
            <>
              <Link to="/find-mentor" className="text-blue-500 hover:underline">
                Find a Mentor
              </Link>
              <Link to="/my-sessions" className="text-blue-500 hover:underline">
                My Sessions
              </Link>
            </>
          )}
          {user?.role === "Mentor" && (
            <>
              <Link to="/session-requests" className="text-blue-500 hover:underline">
                Session Requests
              </Link>
              <Link to="/my-mentees" className="text-blue-500 hover:underline">
                My-mentees
              </Link>
            </>
          )}
        </div>
      </div>

      <div className='mt-8'> 
        {/* Recent Requests (Only for mentors) */}
      {user?.role === 'Mentor' && requests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Recent Session Requests</h3>
          <ul className="space-y-2">
            {requests.slice(0, 3).map((req) => (
              <li key={req._id} className="bg-white p-3 shadow rounded">
                <span className="font-medium">{req.learner.name}</span> requested a session on{' '}
                <span className="text-sm text-gray-500">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Sessions (Only for learners) */}
      {user?.role === 'Learner' && sessions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Recent Mentorships</h3>
          <ul className="space-y-2">
            {sessions.slice(0, 3).map((session) => (
              <li key={session._id} className="bg-white p-3 shadow rounded">
                You requested mentorship from{' '}
                <span className="font-medium">{session.mentor?.name || 'Mentor'}</span> on{' '}
                <span className="text-sm text-gray-500">
                  {new Date(session.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {user?.role === "Learner" && (
        <div className="bg-white p-6 rounded-2xl shadow mt-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          {upcomingSessions.length > 0 ? (
            <ul className="space-y-2">
              {upcomingSessions.map((session) => (
                <li key={session._id} className="text-sm text-gray-700">
                  {new Date(session.date).toLocaleDateString()} with {session.mentor.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No upcoming sessions</p>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default DashboardWelcome;
