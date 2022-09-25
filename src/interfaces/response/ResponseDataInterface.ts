import {ResponseElementInterface} from "./ResponseElementInterface";
import {RecordInterface} from "../database/RecordInterface";
import {RelationshipInterface} from "../RelationshipInterface";

export interface ResponseDataInterface {
	elements: ResponseElementInterface[];

	addComponent<T>(
		type: T,
		currentElement: RecordInterface,
		data: RecordInterface[]|RecordInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseElementInterface|null,
		position?: number|null,
	): void;
}
