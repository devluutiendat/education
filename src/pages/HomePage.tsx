import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-12 text-center max-w-lg w-full">
        <div className="text-7xl mb-4">🎮</div>

        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          EdTech Mini Games
        </h1>

        <p className="text-gray-600 mb-8">
          Học toán và nhận biết hình học thông qua các trò chơi tương tác vui nhộn.
        </p>

        <Link
          to="/game"
          className="
            inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95
          "
        >
          🚀 Start Game
        </Link>
      </div>
    </div>
  );
}