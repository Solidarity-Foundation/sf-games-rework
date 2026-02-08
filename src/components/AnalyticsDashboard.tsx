import { useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown, ChevronUp, Users, Trophy, BarChart3, Star } from 'lucide-react';
import { queryAllGameStats, queryAnswerCounts, querySessions } from '@/lib/db';
import type { GameStat, AnswerCount, SessionRecord } from '@/lib/db';
import poshGameData from '@/components/posh/gamedata.json';

const GAMES = [
	{ id: 'all', label: 'All Games' },
	{ id: 'posh', label: 'PoSH' },
	{ id: 'inclusion-diversity', label: 'Inclusion & Diversity' },
	{ id: 'financial-literacy', label: 'Financial Literacy' },
	{ id: 'workplace-etiquette', label: 'Workplace Etiquette' },
];

const TIME_RANGES = [
	{ id: '24h', label: 'Last 24 hours', ms: 86_400_000 },
	{ id: '7d', label: 'Last 7 days', ms: 604_800_000 },
	{ id: '30d', label: 'Last 30 days', ms: 2_592_000_000 },
	{ id: '6m', label: 'Last 6 months', ms: 15_552_000_000 },
	{ id: '1y', label: 'Last 1 year', ms: 31_536_000_000 },
];

const GAME_LABELS: Record<string, string> = {
	posh: 'PoSH',
	'inclusion-diversity': 'Inclusion & Diversity',
	'financial-literacy': 'Financial Literacy',
	'workplace-etiquette': 'Workplace Etiquette',
};

function getSince(rangeId: string): number {
	return Date.now() - (TIME_RANGES.find((r) => r.id === rangeId)?.ms ?? 0);
}

function formatTimestamp(ms: number): string {
	const date = new Date(ms);
	return (
		date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
		', ' +
		date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
	);
}

const AnalyticsDashboard = () => {
	const navigate = useNavigate();
	const [selectedGame, setSelectedGame] = useState('all');
	const [selectedRange, setSelectedRange] = useState('7d');
	const [gameStats, setGameStats] = useState<GameStat[]>([]);
	const [loading, setLoading] = useState(true);
	const [expandedGames, setExpandedGames] = useState<Set<string>>(new Set());
	const [answerCounts, setAnswerCounts] = useState<Record<string, AnswerCount[]>>({});
	const [sessions, setSessions] = useState<SessionRecord[]>([]);
	const [recentSessions, setRecentSessions] = useState<SessionRecord[]>([]);
	const [levelCounts, setLevelCounts] = useState<Record<string, Record<string, number>>>({});

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setAnswerCounts({});
		setExpandedGames(new Set());

		const filters = {
			gameId: selectedGame === 'all' ? undefined : selectedGame,
			since: getSince(selectedRange),
		};

		Promise.all([queryAllGameStats(filters), querySessions(filters), querySessions(filters)])
			.then(([stats, filteredSessions, recentSessionsData]) => {
				if (!cancelled) {
					setGameStats(stats);
					setSessions(filteredSessions);
					setRecentSessions(recentSessionsData.slice(-10).reverse());

					// Count levels per game
					const levelsByGame: Record<string, Record<string, number>> = {};
					filteredSessions.forEach((session) => {
						if (!session.level) return;
						if (!levelsByGame[session.game_id]) levelsByGame[session.game_id] = {};
						const level = session.level;
						levelsByGame[session.game_id][level] = (levelsByGame[session.game_id][level] || 0) + 1;
					});
					setLevelCounts(levelsByGame);

					setLoading(false);
				}
			})
			.catch(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [selectedGame, selectedRange]);

	const handleToggle = (gameId: string) => {
		if (expandedGames.has(gameId)) {
			setExpandedGames((prev) => {
				const next = new Set(prev);
				next.delete(gameId);
				return next;
			});
		} else {
			setExpandedGames((prev) => new Set(prev).add(gameId));
			queryAnswerCounts(gameId, { since: getSince(selectedRange) })
				.then((counts) => setAnswerCounts((prev) => ({ ...prev, [gameId]: counts })))
				.catch(() => {});
		}
	};

	const displayedStats = gameStats.filter((s) => selectedGame === 'all' || s.game_id === selectedGame);

	// Calculate overall stats
	const totalAttempts = gameStats.reduce((sum, s) => sum + s.attempts, 0);
	const mostPlayedGame = [...gameStats].sort((a, b) => b.attempts - a.attempts)[0];

	return (
		<div className="min-h-screen bg-[#b8f0d0] flex flex-col">
			<header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-4">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-center gap-3">
						<button onClick={() => navigate('/')} className="p-1 hover:bg-gray-100 rounded shrink-0" aria-label="Home">
							<Home size={22} className="text-gray-700" />
						</button>
						<div className="flex-1 min-w-0">
							<h1 className="text-xl font-bold text-gray-800">Games Analytics Dashboard</h1>
							<p className="text-sm text-gray-500">Monitor game performance and user engagement</p>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
				{/* Stats cards and dropdowns on same row */}
				<div className="flex flex-wrap items-start justify-between gap-4 mb-6">
					{/* Left side: stat cards */}
					<div className="flex flex-wrap gap-3">
						<StatCard icon={<Users size={20} className="text-blue-600" />} label="Total Attempts" value={totalAttempts} bgColor="bg-blue-50" />
						<StatCard
							icon={<Star size={20} className="text-orange-600" />}
							label="Most Played"
							sublabel="(by attempts)"
							value={mostPlayedGame ? GAME_LABELS[mostPlayedGame.game_id] : '-'}
							bgColor="bg-orange-50"
							small
						/>
					</div>

					{/* Right side: dropdowns */}
					<div className="flex flex-wrap gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-xs text-gray-500 uppercase tracking-wide">Game</label>
							<select
								value={selectedGame}
								onChange={(e) => setSelectedGame(e.target.value)}
								className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
								{GAMES.map((g) => (
									<option key={g.id} value={g.id}>
										{g.label}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs text-gray-500 uppercase tracking-wide">Time Range</label>
							<select
								value={selectedRange}
								onChange={(e) => setSelectedRange(e.target.value)}
								className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
								{TIME_RANGES.map((r) => (
									<option key={r.id} value={r.id}>
										{r.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Game cards */}
				{loading ? (
					<div className="flex items-center justify-center h-48 text-gray-500">Loading…</div>
				) : (
					<div className="space-y-3">
						{displayedStats.map((stat) => (
							<GameCard
								key={stat.game_id}
								stat={stat}
								isExpanded={expandedGames.has(stat.game_id)}
								onToggle={() => handleToggle(stat.game_id)}
								answerCounts={answerCounts[stat.game_id] ?? []}
								levelCounts={levelCounts[stat.game_id] ?? {}}
							/>
						))}
					</div>
				)}

				{/* Recent sessions table */}
				{recentSessions.length > 0 && (
					<div className="mt-8 bg-white rounded-2xl shadow-sm p-5">
						<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
							<span className="text-2xl">📋</span>
							Recent Completed Sessions
						</h2>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-2">
											Game Type
										</th>
										<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-2">Score</th>
										<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-2">Completed</th>
									</tr>
								</thead>
								<tbody>
									{recentSessions.map((session, idx) => (
										<tr key={idx} className="border-b border-gray-100 last:border-0">
											<td className="py-3 px-2">
												<span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
													{GAME_LABELS[session.game_id] ?? session.game_id}
												</span>
											</td>
											<td className="py-3 px-2">
												<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
													{session.score ?? '-'}
												</span>
											</td>
											<td className="py-3 px-2 text-sm text-gray-600">{formatTimestamp(session.played_at)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

interface StatCardProps {
	icon: ReactNode;
	label: string;
	sublabel?: string;
	value: string | number;
	bgColor: string;
	small?: boolean;
}

const StatCard = ({ icon, label, sublabel, value, bgColor, small }: StatCardProps) => (
	<div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
		<div className={`${bgColor} p-2 rounded-lg shrink-0`}>{icon}</div>
		<div className="flex-1 min-w-0">
			<p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
				{label}
				{sublabel && <span className="font-normal"> {sublabel}</span>}
			</p>
			<p className={`font-bold text-gray-800 ${small ? 'text-base truncate' : 'text-2xl'}`}>{value}</p>
		</div>
	</div>
);

interface GameCardProps {
	stat: GameStat;
	isExpanded: boolean;
	onToggle: () => void;
	answerCounts: AnswerCount[];
	levelCounts: Record<string, number>;
}

const GameCard = ({ stat, isExpanded, onToggle, answerCounts, levelCounts }: GameCardProps) => {
	const hasData = stat.attempts > 0;

	return (
		<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
			<button
				onClick={onToggle}
				className="w-full text-left flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
				<div className="flex flex-wrap items-center gap-2">
					<span className="font-semibold text-gray-800">{GAME_LABELS[stat.game_id] ?? stat.game_id}</span>
					{hasData && (
						<span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
							{stat.correct_rate}% correct
						</span>
					)}
				</div>
				<div className="flex items-center gap-3 ml-2 shrink-0">
					{hasData ? (
						<>
							<span className="text-sm text-gray-500 hidden sm:block">
								{stat.attempts} attempt{stat.attempts !== 1 ? 's' : ''}
							</span>
							{Object.keys(levelCounts).length > 0 && (
								<div className="hidden lg:flex items-center gap-1.5">
									{Object.entries(levelCounts).map(([level, count]) => {
										const shortLevel = level.split(' ').pop() || level;
										return (
											<span key={level} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
												{shortLevel}: {count}
											</span>
										);
									})}
								</div>
							)}
						</>
					) : (
						<span className="text-sm text-gray-400 italic">No data</span>
					)}
					{isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
				</div>
			</button>

			{hasData && (
				<div className="px-5 pb-1">
					<div className="flex flex-wrap items-center gap-2 text-xs mb-2 sm:hidden">
						<span className="text-gray-500">
							{stat.attempts} attempt{stat.attempts !== 1 ? 's' : ''}
						</span>
						{Object.entries(levelCounts).map(([level, count]) => {
							const shortLevel = level.split(' ').pop() || level;
							return (
								<span key={level} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
									{shortLevel}: {count}
								</span>
							);
						})}
					</div>
					<div className="w-full bg-gray-100 rounded-full h-2 mb-3">
						<div className="bg-teal-500 h-2 rounded-full" style={{ width: `${stat.correct_rate}%` }} />
					</div>
				</div>
			)}

			{isExpanded && (
				<div className="px-5 pb-5 border-t border-gray-100 pt-4">
					<h3 className="text-sm font-semibold text-gray-600 mb-3">Question-by-Question Breakdown</h3>
					{hasData ? (
						<QuestionBreakdown answerCounts={answerCounts} gameId={stat.game_id} />
					) : (
						<p className="text-sm text-gray-400 italic">No sessions recorded yet.</p>
					)}
				</div>
			)}
		</div>
	);
};

const QuestionBreakdown = ({ answerCounts, gameId }: { answerCounts: AnswerCount[]; gameId: string }) => {
	if (!answerCounts.length) {
		return <p className="text-sm text-gray-400 italic">No answer data available.</p>;
	}

	// Get game data if available (currently only PoSH has data)
	const gameQuestions = gameId === 'posh' ? poshGameData.questions : null;

	const byQuestion: Record<number, Record<number, number>> = {};
	answerCounts.forEach(({ question_id, answer_index, count }) => {
		if (!byQuestion[question_id]) byQuestion[question_id] = {};
		byQuestion[question_id][answer_index] = count;
	});

	const questionIds = Object.keys(byQuestion)
		.map(Number)
		.sort((a, b) => a - b);

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
			{questionIds.map((qId) => {
				const counts = byQuestion[qId];
				const question = gameQuestions?.find((q) => q.id === qId);
				const correctAnswerIndex = question?.options.findIndex((opt) => opt.poshPoints > 0) ?? -1;

				return (
					<div key={qId} className="bg-gray-50 rounded-xl p-3">
						<p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Q{qId}</p>
						{question && <p className="text-xs text-gray-600 mb-2 line-clamp-2">{question.title}</p>}
						<div className="space-y-1.5">
							{['A', 'B', 'C', 'D'].map((letter, i) => {
								const count = counts[i] ?? 0;
								const isCorrect = i === correctAnswerIndex;
								return (
									<div key={i} className="flex items-center justify-between gap-1">
										<span
											className={`text-xs font-bold px-1.5 py-0.5 rounded ${
												isCorrect ? 'bg-green-500 text-white' : 'text-gray-500'
											}`}>
											{letter}
										</span>
										<span className="text-xs font-bold px-1.5 py-0.5 rounded min-w-[20px] text-center bg-gray-100 text-gray-700">
											{count}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AnalyticsDashboard;
