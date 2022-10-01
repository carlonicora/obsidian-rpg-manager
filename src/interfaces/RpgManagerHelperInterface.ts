import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "./database/DatabaseInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {DataManipulatorsInterface} from "./DataManipulatorsInterface";
import {DatabaseV2Interface} from "../_dbV2/interfaces/DatabaseV2Interface";

export interface RpgManagerHelperInterface {
	get settings(): RpgManagerSettingsInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get databaseV2(): DatabaseV2Interface;
	set databaseV2(database: DatabaseV2Interface);
	get factories(): FactoriesInterface;
	get dataManipulators(): DataManipulatorsInterface;
	get tagHelper(): TagHelper;

	updateSettings(settings: Partial<RpgManagerSettingsInterface>): Promise<void>;
}
