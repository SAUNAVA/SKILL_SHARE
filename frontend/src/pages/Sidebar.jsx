import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { Menu, X } from 'lucide-react'; // Import the close (X) icon

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const linkClasses = (path) =>
    `block py-2 px-4 rounded-md transition ${
      location.pathname === path
        ? isCollapsed
          ? 'bg-red-100' // Highlight for collapsed state
          : 'bg-blue-200 font-semibold' // Highlight for expanded state
        : 'hover:bg-blue-100'
    }`;

  // Automatically collapse sidebar on mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {/* Toggle Button (Visible when collapsed) */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${isCollapsed ? 'w-16' : 'w-64'
          } bg-white shadow-lg min-h-screen p-4 transition-all duration-300 relative`}
      >
        {/* Close Button (Visible when expanded) */}
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 z-50 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
          >
            <X size={20} />
          </button>
        )}

        <h2
          className={`text-xl font-bold mb-6 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'
            }`}
        >
          SkillSwap
        </h2>

        <nav className="space-y-2">
          <Link to="/dashboard" className={linkClasses('/dashboard')}>
            <div className="flex items-center gap-2">
              📊
              {!isCollapsed && <span className="transition-opacity duration-300">Dashboard</span>}
            </div>
          </Link>
          <Link to="/profile" className={linkClasses('/profile')}>
            <div className="flex items-center gap-2">
              🙍
              {!isCollapsed && <span className="transition-opacity duration-300">My Profile</span>}
            </div>
          </Link>

          {user?.role === 'Learner' && (
            <>
              <Link to="/find-mentor" className={linkClasses('/find-mentor')}>
                <div className="flex items-center gap-2">
                  🔍
                  {!isCollapsed && <span className="transition-opacity duration-300">Find Mentor</span>}
                </div>
              </Link>
              <Link to="/my-sessions" className={linkClasses('/my-sessions')}>
                <div className="flex items-center gap-2">
                  📅
                  {!isCollapsed && <span className="transition-opacity duration-300">My Sessions</span>}
                </div>
              </Link>
            </>
          )}

          {user?.role === 'Mentor' && (
            <>
              <Link to="/session-requests" className={linkClasses('/requests')}>
                <div className="flex items-center gap-2">
                  📥
                  {!isCollapsed && <span className="transition-opacity duration-300">Session Requests</span>}
                </div>
              </Link>
              <Link to="/mentees" className={linkClasses('/mentees')}>
                <div className="flex items-center gap-2">
                  👨‍🎓
                  {!isCollapsed && <span className="transition-opacity duration-300">My Mentees</span>}
                </div>
              </Link>
            </>
          )}
        </nav>

        <div className="mt-10 border-t pt-4">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 hover:text-blue-600 ${isCollapsed ? 'justify-center' : ''
              }`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="transition-opacity duration-300">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;