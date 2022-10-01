import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {DataManipulatorsInterface} from "./DataManipulatorsInterface";
import {DatabaseV2Interface} from "../_dbV2/interfaces/DatabaseV2Interface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseV2Interface;
	factories: FactoriesInterface;
	dataManipulators: DataManipulatorsInterface;
	tagHelper: TagHelper;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void>;
}
