import {RpgManagerSettingsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "./FactoriesInterface";
import {TagService} from "../../src/services/tagService/TagService";
import {ManipulatorsInterface} from "../services/manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../../src/database/interfaces/DatabaseInterface";
import {ServiceManagerInterface} from "../../src/api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../src/api/interfaces/RpgManagerApiInterface";

export interface RpgManagerHelperInterface {
	get settings(): RpgManagerSettingsInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get factories(): FactoriesInterface;
	get manipulators(): ManipulatorsInterface;
	get tagHelper(): TagService;
	get pluginVersion(): string;
	get services(): ServiceManagerInterface;
	get api(): RpgManagerApiInterface;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial?: boolean,
	): Promise<void>;
}
