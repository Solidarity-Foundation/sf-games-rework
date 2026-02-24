import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, TrendingUp, Trophy } from 'lucide-react';
import lockIcon from '@/assets/lock-icon.png';
import { useWorkplaceStore } from './workplaceStore';
import { ROOM_SEQUENCE } from './roomConfig';
import officeFloorPlan from '@/assets/office-floor-plan.png';

// Hotspot positions as % of image width/height.
// Adjust these values to fine-tune alignment with the PNG.
const HOTSPOTS = [
	{ roomId: 'workspace-a', label: 'Workspace A', label_kan: 'ಕಾರ್ಯಕ್ಷೇತ್ರ A', left: 5, top: 5, width: 28, height: 30 },
	{ roomId: 'workspace-b', label: 'Workspace B', label_kan: 'ಕಾರ್ಯಕ್ಷೇತ್ರ B', left: 35, top: 5, width: 25, height: 30 },
	{
		roomId: 'conference-room',
		label: 'Conference Room',
		label_kan: 'ಸಮ್ಮೇಳನ ಕೊಠಡಿ',
		left: 62,
		top: 5.5,
		width: 33.5,
		height: 22,
	},
	{
		roomId: 'manager-office-1',
		label: 'Manager Office',
		label_kan: 'ವ್ಯವಸ್ಥಾಪಕ ಕಚೇರಿ',
		left: 62,
		top: 29,
		width: 13.5,
		height: 13.5,
	},
	{
		roomId: 'small-meeting-room',
		label: 'Meeting Room',
		label_kan: 'ಸಣ್ಣ ಸಭಾ ಕೊಠಡಿ',
		left: 84,
		top: 29,
		width: 11.5,
		height: 13.5,
	},
	{ roomId: 'team-pod-1', label: 'Team Pod A', label_kan: 'ತಂಡ ಪಾಡ್ A', left: 4.5, top: 40.5, width: 20, height: 13 },
	{ roomId: 'team-pod-2', label: 'Team Pod B', label_kan: 'ತಂಡ ಪಾಡ್ B', left: 30.5, top: 40.5, width: 18, height: 13 },
	{
		roomId: 'kitchen-lunch-area',
		label: 'Lunch Area',
		label_kan: 'ಊಟದ ಕೋಣೆ',
		left: 61,
		top: 44.5,
		width: 34.5,
		height: 20.5,
	},
	{
		roomId: 'reception-area',
		label: 'Reception',
		label_kan: 'ಸ್ವಾಗತ ಮೇಜು',
		left: 4.5,
		top: 63.25,
		width: 19,
		height: 23,
	},
	{
		roomId: 'seating-waiting-area',
		label: 'Waiting Area',
		label_kan: 'ಕಾಯುವ ಪ್ರದೇಶ',
		left: 29,
		top: 63,
		width: 14,
		height: 23.5,
	},
];

const WorkplaceFloorPlan = () => {
	const navigate = useNavigate();
	const { currentRoomIndex, completedRooms, language, setLanguage } = useWorkplaceStore();

	const currentRoom = ROOM_SEQUENCE[currentRoomIndex];
	const completed = completedRooms.length;
	const progressPct = (completed / 10) * 100;

	const t = {
		title: language === 'kan' ? 'ಕಚೇರಿ ನಕ್ಷೆ' : 'Tasty Bites Food Office',
		tagline: language === 'kan' ? 'ಉತ್ತಮ ತಂಡ, ಉತ್ತಮ ರುಚಿ' : 'Great Team. Great Taste.',
		progress: language === 'kan' ? `${completed}/10 ಕೊಠಡಿಗಳು ಪೂರ್ಣ` : `${completed} of 10 rooms completed`,
		hint: language === 'kan' ? 'ಹೊಳೆಯುವ ಕೊಠಡಿಯನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ' : 'Tap the glowing room to start your tour',
		explore: language === 'kan' ? 'ಕಚೇರಿಯನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore every corner of our office',
	};

	const handleRoomClick = (roomId: string) => {
		navigate(`/workplace-etiquette/question/${roomId}`);
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ background: 'linear-gradient(160deg, #fff8f0 0%, #fef3e2 40%, #e8f4fb 100%)' }}>
			{/* Header — warm brand gradient */}
			<header
				className="sticky top-0 z-10 shadow-md"
				style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f48c06 50%, #faa307 100%)' }}>
				<div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full gap-2">
					<button
						onClick={() => navigate('/')}
						className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors shrink-0"
						aria-label="Home">
						<Home size={18} className="text-white" />
					</button>
					<div className="text-center flex-1 min-w-0">
						<h1 className="text-base font-bold text-white tracking-wide leading-tight font-sans truncate">{t.title}</h1>
						<p className="text-xs text-orange-100 font-sans">{t.tagline}</p>
					</div>
					{/* Language toggle */}
					<div className="flex shrink-0 rounded-lg overflow-hidden border border-white/40">
						<button
							onClick={() => setLanguage('en')}
							className={`px-2.5 py-1 text-xs font-bold font-sans transition-colors ${language === 'en' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}>
							EN
						</button>
						<button
							onClick={() => setLanguage('kan')}
							className={`px-2.5 py-1 text-xs font-bold font-sans transition-colors ${language === 'kan' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}>
							ಕನ್ನಡ
						</button>
					</div>
				</div>
			</header>

			{/* Progress section */}
			<div className="px-4 pt-3 pb-2 max-w-2xl mx-auto w-full">
				<div className="bg-white rounded-2xl shadow-sm border border-orange-100 px-4 py-3">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<TrendingUp size={15} className="text-orange-500" />
							<span className="text-xs font-semibold text-gray-700 font-sans">{t.progress}</span>
						</div>
						<span className="text-xs font-bold text-orange-500 font-sans">{Math.round(progressPct)}%</span>
					</div>
					{/* Progress bar */}
					<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
						<div
							className="h-full rounded-full transition-all duration-700"
							style={{
								width: `${progressPct}%`,
								background: 'linear-gradient(90deg, #f97316, #22c55e)',
							}}
						/>
					</div>
					{completed === 0 && <p className="text-xs text-orange-500 font-sans mt-2 text-center">{t.hint}</p>}
					{completed > 0 && completed < 10 && (
						<p className="text-xs text-green-600 font-sans mt-2 text-center font-medium">
							{language === 'kan' ? 'ಚೆನ್ನಾಗಿದೆ! ಮುಂದುವರಿಸಿ 🎉' : 'Great progress! Keep going 🎉'}
						</p>
					)}
					{completed === 10 && (
						<p className="text-xs text-green-600 font-sans mt-2 text-center font-bold">
							{language === 'kan' ? 'ಎಲ್ಲಾ ಕೊಠಡಿಗಳು ಪೂರ್ಣ! 🏆' : 'All rooms completed! 🏆'}
						</p>
					)}
				</div>
			</div>

			{/* Explore label */}
			<div className="max-w-2xl mx-auto w-full px-4 pb-2">
				<p className="text-xs text-center text-gray-500 font-sans tracking-wide uppercase">{t.explore}</p>
			</div>

			{/* Floor plan + hotspots */}
			<main className="flex-1 flex flex-col items-center px-4 pb-6 overflow-auto gap-4">
				<div
					className="w-full max-w-2xl"
					style={{ boxShadow: '0 8px 32px rgba(232, 93, 4, 0.18), 0 2px 8px rgba(0,0,0,0.10)', borderRadius: '1rem' }}>
					{/* Tasty Bites HQ banner — above the image, not overlapping */}
					<div
						className="flex items-center justify-center py-2.5"
						style={{ background: 'linear-gradient(90deg, #e85d04, #faa307)', borderRadius: '1rem 1rem 0 0' }}>
						<span className="text-white text-xs font-bold font-sans tracking-widest uppercase drop-shadow">
							{language === 'kan' ? '🍽️ ಟೇಸ್ಟಿ ಬೈಟ್ಸ್' : '🍽️ Tasty Bites HQ'}
						</span>
					</div>

					{/* Image + hotspot overlay */}
					<div className="relative w-full overflow-hidden" style={{ borderRadius: '0 0 1rem 1rem' }}>
						<img
							src={officeFloorPlan}
							alt="Office Floor Plan"
							className="w-full h-auto block select-none"
							draggable={false}
						/>

						{/* Overlay — exactly covers the image */}
						<div className="absolute inset-0 pointer-events-none">
							{HOTSPOTS.map((h) => {
								const isCompleted = completedRooms.includes(h.roomId);
								const isCurrent = currentRoom?.id === h.roomId;
								const label = language === 'kan' ? h.label_kan : h.label;

								let overlayClass = '';
								if (isCompleted) {
									overlayClass = 'bg-green-400/40 border-2 border-green-500 rounded';
								} else if (isCurrent) {
									overlayClass = 'rounded cursor-pointer';
								} else {
									overlayClass = 'bg-slate-600/45 border border-slate-500/60 rounded';
								}

								return (
									<div
										key={h.roomId}
										onClick={isCurrent ? () => handleRoomClick(h.roomId) : undefined}
										style={{
											position: 'absolute',
											left: `${h.left}%`,
											top: `${h.top}%`,
											width: `${h.width}%`,
											height: `${h.height}%`,
											pointerEvents: isCurrent ? 'auto' : 'none',
										}}
										className={overlayClass}>
										{/* Completed: checkmark + label */}
										{isCompleted && (
											<span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
												<span className="text-green-600 font-bold text-xl drop-shadow">✓</span>
												<span
													style={{ fontSize: 'clamp(8px, 2vw, 16px)' }}
													className="text-white drop-shadow-md font-normal text-center leading-tight font-sans bg-green-600/70 rounded px-2 py-1">
													{label}
												</span>
											</span>
										)}

										{/* Current: pulsing bg layer + steady label */}
										{isCurrent && (
											<>
												<span className="absolute inset-0 rounded bg-orange-400/50 border-2 border-orange-500 animate-pulse-scale" />
												<span className="absolute inset-0 flex items-center justify-center">
													<span
														style={{ fontSize: 'clamp(8px, 2vw, 16px)' }}
														className="text-white drop-shadow-md font-semibold text-center leading-tight font-sans bg-orange-600 rounded px-2 py-1">
														{label}
													</span>
												</span>
											</>
										)}

										{/* Locked: lock icon + label */}
										{!isCompleted && !isCurrent && (
											<span className="absolute inset-0 flex flex-col items-center justify-center gap-1">
												<img src={lockIcon} alt="Locked" className="w-8 h-8 drop-shadow-sm" />
												<span
													style={{ fontSize: 'clamp(7px, 1.8vw, 15px)' }}
													className="text-white drop-shadow-md font-normal text-center leading-tight font-sans bg-slate-700/60 rounded px-1 py-1">
													{label}
												</span>
											</span>
										)}
									</div>
								);
							})}
						</div>

						{/* See Results button — shown when all 10 rooms are completed */}
						{completed === 10 && (
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<button
									onClick={() => navigate('/workplace-etiquette/results')}
									className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full font-bold font-sans text-white shadow-xl text-sm transition-transform hover:scale-105 active:scale-95"
									style={{
										background: 'linear-gradient(90deg, #e85d04, #faa307)',
										boxShadow: '0 4px 24px rgba(232,93,4,0.45)',
									}}>
									<Trophy size={18} />
									{language === 'kan' ? 'ಫಲಿತಾಂಶ ನೋಡಿ' : 'See Results'}
								</button>
							</div>
						)}

						{/* Static washroom labels — not hotspots */}
						{[
							{ left: 45, top: 75, width: 19, height: 16 },
							{ left: 67, top: 75, width: 24, height: 16 },
						].map((w, i) => (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: `${w.left}%`,
									top: `${w.top}%`,
									width: `${w.width}%`,
									height: `${w.height}%`,
									pointerEvents: 'none',
								}}
								className="flex items-end justify-center pb-2">
								<span
									style={{ fontSize: 'clamp(7px, 1.8vw, 14px)' }}
									className="text-gray-600 font-sans text-center leading-tight">
									{language === 'kan' ? 'ಶೌಚಾಲಯ' : 'Washroom'}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Restart button — centered below the floor plan */}
				<button
					onClick={() => navigate('/workplace-etiquette')}
					className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-orange-300 text-orange-600 bg-white hover:bg-orange-50 transition-colors text-xs font-semibold font-sans shadow-sm">
					<RotateCcw size={13} />
					<span>{language === 'kan' ? 'ಮರಳಿ ಪ್ರಾರಂಭಿಸಿ' : 'Restart Game'}</span>
				</button>
			</main>
		</div>
	);
};

export default WorkplaceFloorPlan;
