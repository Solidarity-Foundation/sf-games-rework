export interface RoomConfig {
	id: string;
	name: string;
	name_kan: string;
	questionId: number;
	sequenceIndex: number;
	// Grid position and size for isometric layout
	gridX: number;
	gridY: number;
	gridW: number;
	gridH: number;
	color: string;
	interactive: true;
}

export interface DecorativeRoomConfig {
	id: string;
	name: string;
	name_kan: string;
	gridX: number;
	gridY: number;
	gridW: number;
	gridH: number;
	color: string;
	interactive: false;
}

// 10 interactive rooms mapped to 10 questions (wireframe section 3.3 & 5)
export const ROOM_SEQUENCE: RoomConfig[] = [
	{
		id: 'workspace-a',
		name: 'Workspace A',
		name_kan: 'ಕಾರ್ಯಕ್ಷೇತ್ರ A',
		questionId: 1,
		sequenceIndex: 0,
		gridX: 0,
		gridY: 0,
		gridW: 3,
		gridH: 2,
		color: '#a8c8e8',
		interactive: true,
	},
	{
		id: 'workspace-b',
		name: 'Workspace B',
		name_kan: 'ಕಾರ್ಯಕ್ಷೇತ್ರ B',
		questionId: 2,
		sequenceIndex: 1,
		gridX: 3,
		gridY: 0,
		gridW: 3,
		gridH: 2,
		color: '#a8c8e8',
		interactive: true,
	},
	{
		id: 'team-pod-1',
		name: 'Team Pod 1',
		name_kan: 'ತಂಡ ಪಾಡ್ 1',
		questionId: 3,
		sequenceIndex: 2,
		gridX: 0,
		gridY: 4,
		gridW: 3,
		gridH: 2,
		color: '#c8dca8',
		interactive: true,
	},
	{
		id: 'team-pod-2',
		name: 'Team Pod 2',
		name_kan: 'ತಂಡ ಪಾಡ್ 2',
		questionId: 4,
		sequenceIndex: 3,
		gridX: 3,
		gridY: 4,
		gridW: 3,
		gridH: 2,
		color: '#c8dca8',
		interactive: true,
	},
	{
		id: 'small-meeting-room',
		name: 'Meeting Room',
		name_kan: 'ಸಭಾ ಕೊಠಡಿ',
		questionId: 5,
		sequenceIndex: 4,
		gridX: 8,
		gridY: 4,
		gridW: 3,
		gridH: 2,
		color: '#e8d8a8',
		interactive: true,
	},
	{
		id: 'conference-room',
		name: 'Conference Room',
		name_kan: 'ಸಮ್ಮೇಳನ ಕೊಠಡಿ',
		questionId: 9,
		sequenceIndex: 5,
		gridX: 6,
		gridY: 0,
		gridW: 4,
		gridH: 3,
		color: '#d8c8e8',
		interactive: true,
	},
	{
		id: 'reception-area',
		name: 'Reception Area',
		name_kan: 'ಸ್ವಾಗತ ಪ್ರದೇಶ',
		questionId: 7,
		sequenceIndex: 6,
		gridX: 0,
		gridY: 8,
		gridW: 4,
		gridH: 2,
		color: '#e8c8c8',
		interactive: true,
	},
	{
		id: 'seating-waiting-area',
		name: 'Waiting Area',
		name_kan: 'ಕಾಯುವ ಪ್ರದೇಶ',
		questionId: 8,
		sequenceIndex: 7,
		gridX: 0,
		gridY: 6,
		gridW: 3,
		gridH: 2,
		color: '#e8d8c8',
		interactive: true,
	},
	{
		id: 'kitchen-lunch-area',
		name: 'Lunch Area',
		name_kan: 'ಊಟದ ಪ್ರದೇಶ',
		questionId: 10,
		sequenceIndex: 8,
		gridX: 4,
		gridY: 6,
		gridW: 4,
		gridH: 3,
		color: '#c8e8c8',
		interactive: true,
	},
	{
		id: 'manager-office-1',
		name: 'Manager Office 1',
		name_kan: 'ವ್ಯವಸ್ಥಾಪಕ ಕಚೇರಿ 1',
		questionId: 6,
		sequenceIndex: 9,
		gridX: 8,
		gridY: 7,
		gridW: 2,
		gridH: 2,
		color: '#d8e8f8',
		interactive: true,
	},
];

// Non-interactive decorative rooms
export const DECORATIVE_ROOMS: DecorativeRoomConfig[] = [
	{
		id: 'manager-office-2',
		name: 'Manager Office 2',
		name_kan: 'ವ್ಯವಸ್ಥಾಪಕ ಕಚೇರಿ 2',
		gridX: 8,
		gridY: 10,
		gridW: 2,
		gridH: 2,
		color: '#d8e8f8',
		interactive: false,
	},
	{
		id: 'washroom-1',
		name: 'WC',
		name_kan: 'ಶೌಚಾಲಯ',
		gridX: 5,
		gridY: 9,
		gridW: 1,
		gridH: 1,
		color: '#e0e0e0',
		interactive: false,
	},
	{
		id: 'washroom-2',
		name: 'WC',
		name_kan: 'ಶೌಚಾಲಯ',
		gridX: 6,
		gridY: 9,
		gridW: 1,
		gridH: 1,
		color: '#e0e0e0',
		interactive: false,
	},
	{
		id: 'washroom-3',
		name: 'WC',
		name_kan: 'ಶೌಚಾಲಯ',
		gridX: 7,
		gridY: 9,
		gridW: 1,
		gridH: 1,
		color: '#e0e0e0',
		interactive: false,
	},
];
