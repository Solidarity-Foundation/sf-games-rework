import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
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
		label: 'Small Meeting Room',
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
		label: 'Kitchen/Lunch Area',
		label_kan: 'ಅಡಿಗೆ/ಊಟದ ಪ್ರದೇಶ',
		left: 61,
		top: 44.5,
		width: 34.5,
		height: 20.5,
	},
	{
		roomId: 'reception-area',
		label: 'Reception Area',
		label_kan: 'ಸ್ವಾಗತ ಪ್ರದೇಶ',
		left: 4.5,
		top: 63.25,
		width: 19,
		height: 23,
	},
	{
		roomId: 'seating-waiting-area',
		label: 'Seating Area',
		label_kan: 'ಕುಳಿತುಕೊಳ್ಳುವ ಪ್ರದೇಶ',
		left: 29,
		top: 63,
		width: 14,
		height: 23.5,
	},
];

const WorkplaceFloorPlan = () => {
	const navigate = useNavigate();
	const { currentRoomIndex, completedRooms, language } = useWorkplaceStore();

	const currentRoom = ROOM_SEQUENCE[currentRoomIndex];
	const completed = completedRooms.length;

	const t = {
		title: language === 'kan' ? 'ಕಚೇರಿ ನಕ್ಷೆ' : 'Office Floor Plan',
		progress: language === 'kan' ? `${completed}/10 ಕೊಠಡಿಗಳು ಪೂರ್ಣ` : `${completed}/10 Rooms Completed`,
		hint: language === 'kan' ? 'ಹೊಳೆಯುವ ಕೊಠಡಿಯನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ' : 'Tap the highlighted room to begin',
	};

	const handleRoomClick = (roomId: string) => {
		console.log('Room clicked:', roomId);
		// TODO: navigate to question screen
	};

	return (
		<div className="min-h-screen bg-[#dce8f5] flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
				<button onClick={() => navigate('/')} className="p-1 hover:bg-gray-100 rounded" aria-label="Home">
					<Home size={20} className="text-gray-700" />
				</button>
				<h1 className="text-base font-normal text-white drop-shadow-md">{t.title}</h1>
				<div className="w-8" />
			</header>

			{/* Progress bar */}
			<div className="px-4 py-2 bg-white border-b border-gray-100">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs text-gray-500">{t.progress}</span>
						{completed === 0 && <span className="text-xs text-[#3b6fa0] font-medium">{t.hint}</span>}
					</div>
					<div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-[#3b6fa0] rounded-full transition-all duration-500"
							style={{ width: `${(completed / 10) * 100}%` }}
						/>
					</div>
				</div>
			</div>

			{/* Floor plan + hotspots */}
			<main className="flex-1 flex items-start justify-center p-4 overflow-auto">
				<div className="relative w-full max-w-2xl">
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
								overlayClass = 'bg-purple-400/40 border-2 border-purple-500 rounded cursor-pointer animate-pulse';
							} else {
								overlayClass = 'bg-red-300/50 border border-gray-500/70 rounded';
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
											<span className="text-green-700 font-bold text-xl">✓</span>
											<span className="text-white drop-shadow-md font-normal text-[16px] text-center leading-tight font-sans bg-gray-500/40 rounded px-2 py-1">
												{label}
											</span>
										</span>
									)}

									{/* Current: label only (pulsing bg handles the highlight) */}
									{isCurrent && (
										<span className="absolute inset-0 flex items-center justify-center">
											<span className="text-white drop-shadow-md font-normal text-[16px] text-center leading-tight font-sans bg-gray-500/40 rounded px-2 py-1">
												{label}
											</span>
										</span>
									)}

									{/* Locked: lock icon + label below */}
									{!isCompleted && !isCurrent && (
										<span className="absolute inset-0 flex flex-col items-center justify-center gap-1">
											<img src={lockIcon} alt="Locked" className="w-8 h-8 drop-shadow-md-sm" />
											<span className="text-white drop-shadow-md font-normal text-[15px] text-center leading-tight font-sans bg-gray-500/50 rounded px-1 py-1">
												{label}
											</span>
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</main>
		</div>
	);
};

export default WorkplaceFloorPlan;
