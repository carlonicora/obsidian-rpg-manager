import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export interface ResponseDataInterface {
	elements: ResponseDataElementInterface[];

	addSubModel<T>(
		type: T,
		currentElement: ComponentV2Interface,
		data: ComponentV2Interface[]|ComponentV2Interface|RelationshipV2Interface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseDataElementInterface|null,
		position?: number|null,
	): void;
}
