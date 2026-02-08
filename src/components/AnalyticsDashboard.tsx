import { useNavigate } from "react-router-dom";
import { Home, BarChart2 } from "lucide-react";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#b8f0d0] flex flex-col">
      <header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-white shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Home"
        >
          <Home size={22} className="text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium text-gray-800 -ml-6">
          Analytics Dashboard
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-4 max-w-md w-full">
          <BarChart2 size={48} className="text-teal-500" />
          <h2 className="text-xl font-semibold text-gray-700">
            Coming Soon
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Comprehensive analytics across all games will appear here once gameplay data is collected.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
