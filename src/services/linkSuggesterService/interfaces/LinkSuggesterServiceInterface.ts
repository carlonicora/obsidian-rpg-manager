import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterHandlerInterface} from "./LinkSuggesterHandlerInterface";

export interface LinkSuggesterServiceInterface {
	createHandler(
		editorEl: HTMLInputElement|HTMLTextAreaElement,
		model: ModelInterface,
	): LinkSuggesterHandlerInterface;

	createSimplifiedHandler(
		editorEl: HTMLInputElement|HTMLTextAreaElement,
		model: ModelInterface,
	): LinkSuggesterHandlerInterface;
}
