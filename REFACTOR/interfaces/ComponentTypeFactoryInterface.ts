import {ComponentType} from "../../src/core/enums/ComponentType";

export interface ComponentTypeFactoryInterface {
	createComponentType(
		readableContentType: string,
	): ComponentType;

	createReadableComponentType(
		type: ComponentType,
	): string;
}
