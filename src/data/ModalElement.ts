import {RecordType} from "../enums/RecordType";
import {ModalElementInterface} from "../interfaces/ModalElementInterface";

export class ModalElement implements ModalElementInterface {
	constructor(
		public type: RecordType,
		public id: number,
		public name: string,
	) {
	}
}
