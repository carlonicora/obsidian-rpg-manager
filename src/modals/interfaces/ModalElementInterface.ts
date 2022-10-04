import {ComponentType} from "../../databases/enums/ComponentType";

export interface ModalElementInterface {
	type: ComponentType;
	id: number;
	name: string;
}
