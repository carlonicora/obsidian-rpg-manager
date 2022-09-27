import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ComponentInterface} from "../database/ComponentInterface";
import {RelationshipInterface} from "../RelationshipInterface";

export interface ResponseDataInterface {
	elements: ResponseDataElementInterface[];

	addSubModel<T>(
		type: T,
		currentElement: ComponentInterface,
		data: ComponentInterface[]|ComponentInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseDataElementInterface|null,
		position?: number|null,
	): void;
}
