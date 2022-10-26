import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App} from "obsidian";
import {IdInterface} from "../../services/idService/interfaces/IdInterface";
import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {TagService} from "../../services/tagService/TagService";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ServiceManagerInterface} from "../../api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractRpgManagerError extends Error implements RpgErrorInterface {
	constructor(
		public api: RpgManagerApiInterface,
		public id: IdInterface|undefined,
	) {
		super();
	}

	public getErrorTitle(
	): string|undefined {
		return undefined;
	}

	public abstract showErrorMessage(
	): string;

	public abstract showErrorActions(
	): string;

	public getErrorLinks(
	): string[]|undefined {
		return undefined;
	}
}
