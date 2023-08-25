import { RpgManagerInterface } from "@/RpgManagerInterface";
import { App } from "obsidian";

export const initialise = jest.fn((app: App, api: RpgManagerInterface) => ({
	_app: {},
	_api: {},
}));

export const createSceneAnalyserService = jest.fn(() => ({
	analyseSession: jest.fn(() => ({
		score: 70,
		expectedDuration: 3600,
		activity: 30,
		excitement: 20,
		interest: 40,
		variety: 50,
	})),
}));
