import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-10">
        EdTech Mini Games
      </h1>

      <Link
        to="/game"
        className="px-8 py-4 bg-blue-500 text-white rounded-xl"
      >
        Start Game
      </Link>
    </div>
  );
}