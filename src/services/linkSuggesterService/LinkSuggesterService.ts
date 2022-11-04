import {LinkSuggesterServiceInterface} from "./interfaces/LinkSuggesterServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {LinkSuggesterHandlerInterface} from "./interfaces/LinkSuggesterHandlerInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterHandler} from "./handlers/LinkSuggesterHandler";

export class LinkSuggesterService implements LinkSuggesterServiceInterface, ServiceInterface {
	constructor(
		private _api: RpgManagerApiInterface
	) {
	}

	public createHandler(
		editorEl: HTMLInputElement|HTMLTextAreaElement,
		model: ModelInterface,
	): LinkSuggesterHandlerInterface {
		return new LinkSuggesterHandler(this._api, editorEl, model);
	}
}
