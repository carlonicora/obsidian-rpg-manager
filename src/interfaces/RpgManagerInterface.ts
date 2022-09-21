import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "./database/DatabaseInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	factories: FactoriesInterface;
	tagHelper: TagHelper;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
