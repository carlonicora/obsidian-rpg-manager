import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	version: string;
	api: RpgManagerApiInterface;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial?: boolean,
	): Promise<void>;

	initialise(
	): Promise<void>;
}
