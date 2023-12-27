import { ReactElement } from "react";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { AttributeType } from "src/enums/AttributeType";
import { ElementType } from "src/enums/ElementType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";

export abstract class AbstractAttribute implements Attribute {
	public id: string;
	public type?: AttributeType;
	public limitToTypes?: ElementType[];
	public isCustom?: boolean;
	public options?: string[];
	public customName?: string;
	protected _value?: any;

	constructor(params: {
		id: string;
		type?: AttributeType;
		limitToTypes?: ElementType[];
		isCustom?: boolean;
		options?: string[];
		customName?: string;
		value?: any;
	}) {
		this.id = params.id;
		this.type = params.type;
		this.limitToTypes = params.limitToTypes;
		this.isCustom = params.isCustom;
		this.options = params.options;
		this.customName = params.customName;
		this._value = params.value;
	}

	abstract cloneWithValue(value?: any): Attribute;
	abstract components(): {
		[key in AttributeComponentType]: (props: { element: Element; attribute: Attribute }) => ReactElement;
	};

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
