import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "../databases/TagHelper";
import {ManipulatorsInterface} from "../manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../databases/interfaces/DatabaseInterface";

export interface RpgManagerHelperInterface {
	get settings(): RpgManagerSettingsInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get factories(): FactoriesInterface;
	get manipulators(): ManipulatorsInterface;
	get tagHelper(): TagHelper;
	get pluginVersion(): string;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial?: boolean,
	): Promise<void>;
}
