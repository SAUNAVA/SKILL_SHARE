// components/Navbar.jsx
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">{user?.name}</p>
        <img
          src={user?.avatar || '/dppic.jpg'}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
