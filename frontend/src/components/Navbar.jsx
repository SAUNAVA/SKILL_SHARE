import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-16 bg-gradient-to-r from-teal-500 to-blue-600 shadow-md flex items-center justify-between px-6 text-white">
      <h1 className="text-xl font-bold">Dashboard</h1>
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