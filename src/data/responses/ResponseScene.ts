import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {SceneResponseInterface} from "../../interfaces/response/SceneResponseInterface";
import {ResponseType} from "../../enums/ResponseType";
import {App} from "obsidian";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseScene extends AbstractResponse implements SceneResponseInterface {
	public goals: string|null;
	public actions: string|null;

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Scene;
	}
}
