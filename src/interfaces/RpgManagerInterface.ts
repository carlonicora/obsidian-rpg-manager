import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "../databases/TagHelper";
import {ManipulatorsInterface} from "../manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../databases/interfaces/DatabaseInterface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	factories: FactoriesInterface;
	manipulators: ManipulatorsInterface;
	tagHelper: TagHelper;
	version: string;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial?: boolean,
	): Promise<void>;

	initialise(
	): Promise<void>;
}
