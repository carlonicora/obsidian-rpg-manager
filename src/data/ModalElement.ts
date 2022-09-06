import {DataType} from "../enums/DataType";
import {ModalElementInterface} from "../interfaces/ModalElementInterface";

export class ModalElement implements ModalElementInterface {
	constructor(
		public type: DataType,
		public id: number,
		public name: string,
	) {
	}
}
