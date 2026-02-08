import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface ComingSoonProps {
  title: string;
  color: string;
}

const ComingSoon = ({ title, color }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${color} flex flex-col`}>
      <header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-white shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Home"
        >
          <Home size={22} className="text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium text-gray-800 -ml-6">
          {title}
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-4 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
          <p className="text-gray-500 text-center text-sm">
            This game is coming soon. Stay tuned!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
