import {ComponentType} from "../enums/ComponentType";

export interface ComponentTypeFactoryInterface {
	createComponentType(
		readableContentType: string,
	): ComponentType;

	createReadableComponentType(
		type: ComponentType,
	): string;
}
