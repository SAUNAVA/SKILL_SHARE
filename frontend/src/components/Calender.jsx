import { Calendar } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(),
  getDay: date => date.getDay(),
  locales,
});

const SessionCalendar = () => {
  const { user } = useSelector(state => state.auth);
  const { sessions } = useSelector(state => state.session);
  const { requests } = useSelector(state => state.mentorSessions);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // State to track the current date

  useEffect(() => {
    let Sessions = user?.role === 'Mentor' ? requests : sessions;

    const upcomingSessions = Sessions
      .filter(session => session.status === 'accepted')
      .map(session => ({
        title: user?.role === 'Mentor' 
          ? `Session with ${session.learner?.name || 'Learner'}`
          : `Session with ${session.mentor?.name || 'Mentor'}`,
        start: new Date(session.date),
        end: new Date(new Date(session.date).getTime() + 60 * 60 * 1000), // 1 hour session
      }));

    setEvents(upcomingSessions);
  }, [user, sessions, requests]);

  const handleNavigate = (date) => {
    setCurrentDate(date); // Update the current date when navigating
  };
  const handleSelectEvent = () => {
    navigate(`/session-requests`); // Redirect to the session's page
  };


  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Sessions</h2>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate} // Pass the current date to the calendar
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent} // Handle navigation
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default SessionCalendar;