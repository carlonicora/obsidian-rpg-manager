import { Attribute } from "src/interfaces/Attribute";

export type RpgManagerSettings = {
	chatGptKey: string | undefined;
	templatesFolder: string | undefined;
	assetsFolder: string | undefined;
	automaticMove: boolean;
	useSceneAnalyser: boolean;
	version: string;
	customAttributes: Attribute[];
	forceFullWidth: boolean;
};
