import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {Functions} from "../helpers/Functions";
import {DatabaseInterface} from "./database/DatabaseInterface";
import {Factories} from "../helpers/Factories";
import {TagFactory} from "../factories/TagFactory";
import {Plugin_2} from "obsidian";

export interface RpgManagerInterface extends Plugin_2{
	settings: RpgManagerSettingsInterface;
	functions: Functions;
	database: DatabaseInterface;
	factories: Factories;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
