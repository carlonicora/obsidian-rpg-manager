import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {DataManipulatorsInterface} from "./DataManipulatorsInterface";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";

export interface RpgManagerHelperInterface {
	get settings(): RpgManagerSettingsInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get factories(): FactoriesInterface;
	get dataManipulators(): DataManipulatorsInterface;
	get tagHelper(): TagHelper;

	updateSettings(settings: Partial<RpgManagerSettingsInterface>): Promise<void>;
}
