/**
 * SQLite database (sql.js) for game analytics.
 * Persisted to localStorage as base64-encoded binary.
 *
 * Schema supports all games. Players are anonymous — only timestamp is recorded.
 */

import initSqlJs, { Database } from 'sql.js';

const DB_KEY = 'sf-games-db';
let db: Database | null = null;

async function getDB(): Promise<Database> {
	if (db) return db;

	const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });

	const saved = localStorage.getItem(DB_KEY);
	if (saved) {
		const buf = Uint8Array.from(atob(saved), (c) => c.charCodeAt(0));
		db = new SQL.Database(buf);
	} else {
		db = new SQL.Database();
	}

	db.run(`CREATE TABLE IF NOT EXISTS game_sessions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		game_id TEXT NOT NULL,
		played_at INTEGER NOT NULL,
		total_questions INTEGER NOT NULL,
		questions_answered INTEGER NOT NULL,
		score INTEGER,
		level TEXT,
		duration_seconds INTEGER
	)`);

	db.run(`CREATE TABLE IF NOT EXISTS game_answers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		session_id INTEGER NOT NULL,
		question_id INTEGER NOT NULL,
		answer_index INTEGER NOT NULL,
		points_earned INTEGER NOT NULL
	)`);

	persist(db);
	return db;
}

function persist(database: Database) {
	const data = database.export();
	const str = btoa(String.fromCharCode(...Array.from(data)));
	localStorage.setItem(DB_KEY, str);
}

export interface GameSessionData {
	gameId: string;
	totalQuestions: number;
	questionsAnswered: number;
	score?: number;
	level?: string;
	answers?: Array<{ questionId: number; answerIndex: number; pointsEarned: number }>;
}

export async function saveGameSession(data: GameSessionData): Promise<void> {
	const database = await getDB();
	const now = Date.now();

	database.run(
		`INSERT INTO game_sessions (game_id, played_at, total_questions, questions_answered, score, level)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		[data.gameId, now, data.totalQuestions, data.questionsAnswered, data.score ?? null, data.level ?? null]
	);

	if (data.answers && data.answers.length > 0) {
		const result = database.exec('SELECT last_insert_rowid() as id');
		const sessionId = result[0].values[0][0] as number;

		for (const ans of data.answers) {
			database.run(
				`INSERT INTO game_answers (session_id, question_id, answer_index, points_earned) VALUES (?, ?, ?, ?)`,
				[sessionId, ans.questionId, ans.answerIndex, ans.pointsEarned]
			);
		}
	}

	persist(database);
}
