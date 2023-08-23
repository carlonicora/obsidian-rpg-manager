import { AttributeComponentType } from "../enums/AttributeComponentType";
import { AttributeInterface } from "../interfaces/AttributeInterface";

export class Attribute implements AttributeInterface {
	private _id: string;
	private _name: string;
	private _value: any;
	private _type: AttributeComponentType;
	private _isSet: boolean;

	constructor(name: string, type: AttributeComponentType, id: string, data: any) {
		this._id = id;
		this._name = name;
		this._type = type;
		this._value = data[id];

		this._isSet = data[id] !== undefined;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get value(): any {
		return this._value;
	}

	get type(): AttributeComponentType {
		return this._type;
	}

	get isSet(): boolean {
		return this._isSet;
	}
}
