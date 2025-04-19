// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <h1 className="text-5xl font-bold text-indigo-800 mb-4">SkillShare</h1>
      <p className="text-lg text-gray-700 mb-10">Find a mentor. Be a mentor. Grow together.</p>

      <div className="flex gap-4 mb-8">
        <Link to="/login">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700 transition">Login</button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-2xl shadow hover:bg-indigo-100 transition">Register</button>
        </Link>
      </div>

      <div className="text-center max-w-xl">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="text-gray-700 space-y-2">
          <li>1. Sign up and list your skills to teach & learn.</li>
          <li>2. Get matched with compatible mentors or mentees.</li>
          <li>3. Connect, schedule, and learn skills!</li>
        </ol>
      </div>
    </div>
  );
}
