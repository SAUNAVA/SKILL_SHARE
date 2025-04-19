import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";

const Calendar = () => {
  const { learnerSessions } = useSelector(state => state.session);
  const { mentorRequests } = useSelector(state => state.mentorSession); // if split

  // Combine sessions into calendar events
  const events = [
    ...learnerSessions.map(s => ({
      title: `Session with ${s.mentor.name}`,
      date: s.date,
      color: '#3b82f6'
    })),
    ...mentorRequests
      .filter(req => req.status === 'accepted')
      .map(r => ({
        title: `Mentoring ${r.learner.name}`,
        date: r.date,
        color: '#10b981'
      })),
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Session Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
