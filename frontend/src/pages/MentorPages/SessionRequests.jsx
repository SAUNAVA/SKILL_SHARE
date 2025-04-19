import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionRequests, respondToSession } from "../../features/mentorSlice";
// import Spinner from "../components/Spinner";

const SessionRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector(state => state.mentorSessions);
  // const [respondedRequests, setRespondedRequests] = useState([]);

  useEffect(() => {
    dispatch(fetchSessionRequests());
  }, [dispatch]);

  const handleResponse = (sessionId, actionType) => {
    dispatch(respondToSession({ sessionId, actionType }))
  };

  // if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Session Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No session requests received.</p>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{req.topic}</h3>
                <p className="text-sm text-gray-600">
                  From: {req.learner.name} • {new Date(req.date).toLocaleString()}
                </p>
              </div>
              {/* <div className="text-sm text-gray-500">{req.status}</div> */}
              <div>
              {req.status=='pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleResponse(req._id, "accept")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(req._id, "reject")}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
              <div className="text-sm text-gray-500">
                  {req.status === "accepted" ? "Accepted" : "pending"}
                </div>
              </div>
              
                
              
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionRequests;
