// pages/Dashboard.jsx

import DashboardWelcome from '../components/DashboardWelcome';
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardWelcome/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
