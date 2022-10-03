import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {DataManipulatorsInterface} from "./DataManipulatorsInterface";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	factories: FactoriesInterface;
	dataManipulators: DataManipulatorsInterface;
	tagHelper: TagHelper;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
