import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "./database/DatabaseInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {DataManipulatorsInterface} from "./DataManipulatorsInterface";
import {DatabaseV2Interface} from "../_dbV2/interfaces/DatabaseV2Interface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	databaseV2: DatabaseV2Interface;
	factories: FactoriesInterface;
	dataManipulators: DataManipulatorsInterface;
	tagHelper: TagHelper;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
