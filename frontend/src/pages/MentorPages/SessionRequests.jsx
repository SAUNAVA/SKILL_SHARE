import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionRequests, respondToSession } from "../../features/mentorSlice";
import Navbar from "../../components/Navbar";
import Sidebar from "../Sidebar";

const SessionRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector(state => state.mentorSessions);

  useEffect(() => {
    dispatch(fetchSessionRequests());
  }, [dispatch]);

  const handleResponse = (sessionId, actionType) => {
    dispatch(respondToSession({ sessionId, actionType }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Session Requests</h2>
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <img src="/noData.jpg" alt="No requests" className="w-48 h-48 mb-4" />
                <p>No session requests received.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map(req => (
                  <div
                    key={req._id}
                    className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{req.topic}</h3>
                      <p className="text-sm text-gray-600">
                        From: {req.learner.name} • {new Date(req.date).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      {req.status === "pending" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleResponse(req._id, "accept")}
                            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                            aria-label="Accept session request"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(req._id, "reject")}
                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                            aria-label="Reject session request"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      <div className={`text-sm font-semibold px-2 py-1 rounded-md ${req.status === "accepted" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                        }`}>
                        {req.status === "accepted" ? "Accepted" : "Pending"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SessionRequests;