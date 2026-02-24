import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import poshImage from '@/assets/stop-sexual-harassment.jpg';
import workplaceImage from '@/assets/tbf-logo.png';

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
		labelColor: 'bg-[#fbd0b8]',
		imageBg: 'bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200',
		image: workplaceImage,
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
			<main className="flex-1 px-6 py-8">
				<div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-4">
					{games.map((game) => (
						<button
							key={game.id}
							onClick={() => navigate(game.path)}
							className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 text-left">
							{/* Background */}
							<div className={`absolute inset-0 ${game.imageBg}`}>
								{game.image && <img src={game.image} alt={game.title} className="w-full h-full object-cover" />}
							</div>
							{/* Label */}
							<div className={`absolute bottom-0 left-0 right-0 ${game.labelColor} px-3 py-2 sm:px-4 sm:py-3`}>
								<span className="text-gray-800 font-medium text-sm sm:text-base">{game.title}</span>
							</div>
						</button>
					))}
				</div>

				{/* Analytics Dashboard */}
				<button
					onClick={() => navigate('/analytics')}
					className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 text-left block">
					<div className="w-full h-24 sm:h-32 bg-gradient-to-br from-teal-100 via-cyan-50 to-slate-200 flex items-center justify-center">
						<div className="flex gap-2 sm:gap-3 opacity-60">
							<div className="w-6 sm:w-8 h-12 sm:h-16 bg-teal-400 rounded-t" />
							<div className="w-6 sm:w-8 h-8 sm:h-10 bg-cyan-400 rounded-t mt-4 sm:mt-6" />
							<div className="w-6 sm:w-8 h-16 sm:h-20 bg-emerald-400 rounded-t" />
							<div className="w-6 sm:w-8 h-10 sm:h-12 bg-teal-300 rounded-t mt-2 sm:mt-4" />
						</div>
					</div>
					<div className="bg-[#c8d8c0] px-3 py-2 sm:px-4 sm:py-3">
						<span className="text-gray-800 font-medium text-sm sm:text-base">Analytics Dashboard</span>
					</div>
				</button>
			</main>
		</div>
	);
};

export default HomeScreen;
