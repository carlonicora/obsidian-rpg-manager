import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {SceneResponseInterface} from "../../interfaces/response/SceneResponseInterface";
import {ResponseType} from "../../enums/ResponseType";

export class ResponseScene extends AbstractResponse implements SceneResponseInterface {
	public goals: string|null;
	public actions: string|null;

	constructor() {
		super();
		this.responseType = ResponseType.Scene;
	}
}
