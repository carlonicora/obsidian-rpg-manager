import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {RelationshipInterface} from "../RelationshipInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export interface ResponseDataInterface {
	elements: ResponseDataElementInterface[];

	addSubModel<T>(
		type: T,
		currentElement: ComponentV2Interface,
		data: ComponentV2Interface[]|ComponentV2Interface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseDataElementInterface|null,
		position?: number|null,
	): void;
}
