import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { fetchSessions } from "../features/sessionSlice";

const DashboardWelcome = () => {
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.session);
  const [date, setDate] = useState(new Date());
  const dispatch  = useDispatch();

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

    useEffect(()=>{
      if(user?.role=='Learner'){
        dispatch(fetchSessions())
      }
    },[dispatch , user])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name} 👋</h1>

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
            {!user?.isProfileComplete ? "Please complete your profile to get better matches" : "Role: "+ user?.role}
          </p>
        </div>

        {/* Total Sessions */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Sessions Booked</h2>
          <p className="text-4xl font-bold text-blue-600">{acceptedSessions.length}</p>
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
            <Link to="/session-requests" className="text-blue-500 hover:underline">
              Session Requests
            </Link>
          )}
        </div>
      </div>

      {/* Upcoming Sessions */}
      {user?.role === "Learner" && (
        <div className="bg-white p-6 rounded-2xl shadow">
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

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <ul className="space-y-2">
            {recentActivity.map((session) => (
              <li key={session._id} className="text-sm text-gray-700">
                Session with {session.mentor.name} - Status: {session.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No recent activity</p>
        )}
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
        <Calendar onChange={setDate} value={date} />
        <p className="text-sm text-gray-600 mt-2">
          Selected Date: {date.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcome;
