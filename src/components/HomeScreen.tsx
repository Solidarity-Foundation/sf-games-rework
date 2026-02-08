import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import poshImage from '@/assets/stop-sexual-harassment.jpg';

interface GameCard {
	id: string;
	title: string;
	path: string;
	labelColor: string;
	imageBg: string;
	image?: string;
}

const games: GameCard[] = [
	{
		id: 'inclusion-diversity',
		title: 'Inclusion & Diversity',
		path: '/inclusion-diversity',
		labelColor: 'bg-[#d4bfee]',
		imageBg: 'bg-gradient-to-br from-purple-200 via-violet-100 to-indigo-200',
	},
	{
		id: 'financial-literacy',
		title: 'Financial Literacy',
		path: '/financial-literacy',
		labelColor: 'bg-[#f5d9a8]',
		imageBg: 'bg-gradient-to-br from-yellow-100 via-amber-100 to-green-200',
	},
	{
		id: 'workplace-etiquette',
		title: 'Workplace Etiquette',
		path: '/workplace-etiquette',
		labelColor: 'bg-[#d4bfee]',
		imageBg: 'bg-gradient-to-br from-blue-100 via-sky-100 to-purple-200',
	},
	{
		id: 'posh',
		title: 'PoSH',
		path: '/posh',
		labelColor: 'bg-[#f5a8b8]',
		imageBg: 'bg-gradient-to-br from-pink-300 to-rose-400',
		image: poshImage,
	},
];

const HomeScreen = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#b8f0d0] flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-white shadow-sm">
				<button onClick={() => navigate('/')} className="p-1 hover:bg-gray-100 rounded" aria-label="Home">
					<Home size={22} className="text-gray-700" />
				</button>
				<h1 className="flex-1 text-center text-lg font-medium text-gray-800 -ml-6">SF Games</h1>
			</header>

			{/* Game grid */}
			<main className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-4">
				<div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
					{games.map((game) => (
						<button
							key={game.id}
							onClick={() => navigate(game.path)}
							className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 text-left">
							{/* Image area */}
							<div className={`w-full aspect-[4/3] ${game.imageBg}`}>
								{game.image && <img src={game.image} alt={game.title} className="w-full h-full object-cover" />}
							</div>
							{/* Label */}
							<div className={`${game.labelColor} px-4 py-3`}>
								<span className="text-gray-800 font-medium text-base">{game.title}</span>
							</div>
						</button>
					))}
				</div>

				{/* Analytics Dashboard */}
				<button
					onClick={() => navigate('/analytics')}
					className="w-full max-w-2xl rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 text-left">
					<div className="w-full h-32 bg-gradient-to-br from-teal-100 via-cyan-50 to-slate-200 flex items-center justify-center">
						<div className="flex gap-3 opacity-60">
							<div className="w-8 h-16 bg-teal-400 rounded-t" />
							<div className="w-8 h-10 bg-cyan-400 rounded-t mt-6" />
							<div className="w-8 h-20 bg-emerald-400 rounded-t" />
							<div className="w-8 h-12 bg-teal-300 rounded-t mt-4" />
						</div>
					</div>
					<div className="bg-[#c8d8c0] px-4 py-3">
						<span className="text-gray-800 font-medium text-base">Analytics Dashboard</span>
					</div>
				</button>
			</main>
		</div>
	);
};

export default HomeScreen;
