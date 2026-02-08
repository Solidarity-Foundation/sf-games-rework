/**
 * Appwrite client configuration for SF Games analytics
 */

import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const config = {
	databaseId: import.meta.env.VITE_DATABASE_ID,
	gameSessionsCollectionId: import.meta.env.VITE_GAME_SESSIONS_COLLECTION_ID,
	gameAnswersCollectionId: import.meta.env.VITE_GAME_ANSWERS_COLLECTION_ID,
};

export { ID, Query };
