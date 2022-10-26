import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../../../REFACTOR/interfaces/FactoriesInterface";
import {TagService} from "../../services/tagService/TagService";
import {ManipulatorsInterface} from "../../../REFACTOR/services/manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ServiceManagerInterface} from "../../api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	factories: FactoriesInterface;
	manipulators: ManipulatorsInterface;
	tagHelper: TagService;
	services: ServiceManagerInterface;
	version: string;
	api: RpgManagerApiInterface;

	updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial?: boolean,
	): Promise<void>;

	initialise(
	): Promise<void>;
}
