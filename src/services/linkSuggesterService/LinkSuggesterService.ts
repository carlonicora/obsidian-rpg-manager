import {LinkSuggesterServiceInterface} from "./interfaces/LinkSuggesterServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {LinkSuggesterHandlerInterface} from "./interfaces/LinkSuggesterHandlerInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterHandler} from "./handlers/LinkSuggesterHandler";
import {SimplifiedLinkSuggestionHandler} from "./handlers/SimplifiedLinkSuggestionHandler";
import {ComponentType} from "../../core/enums/ComponentType";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";

export class LinkSuggesterService extends AbstractService implements LinkSuggesterServiceInterface, ServiceInterface {
	public createHandler(
		editorEl: HTMLInputElement|HTMLTextAreaElement,
		model: ModelInterface,
		type?: ComponentType,
	): LinkSuggesterHandlerInterface {
		return new LinkSuggesterHandler(this.api, editorEl, model, type);
	}

	public createSimplifiedHandler(
		editorEl: HTMLInputElement|HTMLTextAreaElement,
		model: ModelInterface,
		type?: ComponentType,
	): LinkSuggesterHandlerInterface {
		return new SimplifiedLinkSuggestionHandler(this.api, editorEl, model, type);
	}
}
