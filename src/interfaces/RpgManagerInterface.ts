import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {Functions} from "../helpers/Functions";
import {DatabaseInterface} from "./database/DatabaseInterface";
import {Factories} from "../helpers/Factories";
import {TagManager} from "../helpers/TagManager";
import {Plugin_2} from "obsidian";

export interface RpgManagerInterface extends Plugin_2{
	settings: RpgManagerSettingsInterface;
	functions: Functions;
	database: DatabaseInterface;
	factories: Factories;
	tagManager: TagManager;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
