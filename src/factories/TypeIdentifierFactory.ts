import { ElementType } from "react";
import { SystemType } from "src/data/enums/SystemType";

export class TypeIdentifierFactory {
	static generateTypeIdentifier(type: ElementType, system: SystemType) {
		return type.toString() + "-" + system.toString();
	}
}
