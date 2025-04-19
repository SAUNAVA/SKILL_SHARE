import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSessions} from "../features/sessionSlice";
// import Spinner from "../components/Spinner";

const MySessions = () => {
  const dispatch = useDispatch();
  const { sessions , loading } = useSelector(state => state.session);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this session request?")) {
      dispatch(cancelSessionRequest(id));
    }
  };

  // if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Sessions</h2>
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <p className="text-gray-500">You have no session requests yet.</p>
        ) : (
          sessions.map(session => (
            <div key={session._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{session.topic}</h3>
                <p className="text-sm text-gray-600">
                  With: {session.mentor.name} • On: {new Date(session.date).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  session.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  session.status === "accepted" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {session.status}
                </span>
                {session.status === "pending" && (
                  <button
                    onClick={() => handleCancel(session._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySessions;
