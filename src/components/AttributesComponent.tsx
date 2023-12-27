import React from "react";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";

export default function AttributesComponent({ element }: { element: Element }): React.ReactElement {
	const attributes: Attribute[] = element.attributes.filter(
		(attribute: Attribute) => attribute.value !== undefined && attribute.id !== "Description"
	);

	return (
		<div>
			{attributes.map((attribute: Attribute) => {
				const componentMapping = attribute.components();

				const ComponentToShow = componentMapping[AttributeComponentType.Browse];

				return <div key={attribute.id}>{ComponentToShow({ element, attribute })}</div>;
			})}
		</div>
	);
}
