import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../../services/relationships/interfaces/RelationshipInterface";

export interface ResponseDataInterface {
	elements: ResponseDataElementInterface[];

	addSubModel<T>(
		type: T,
		currentComponent: ComponentModelInterface,
		data: ComponentModelInterface[]|ComponentModelInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseDataElementInterface|null,
		position?: number|null,
	): void;
}
