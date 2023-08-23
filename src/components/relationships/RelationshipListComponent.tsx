import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import RelationshipComponent from "./RelationshipComponent";

export default function RelationshipListComponent({
	element,
	type,
}: {
	element: ElementInterface;
	type: ElementType;
}): React.ReactElement {
	const { t } = useTranslation();

	const relationships: RelationshipInterface[] = element.relationships.filter(
		(relationship: RelationshipInterface) =>
			relationship.component !== undefined &&
			relationship.component.type === type &&
			relationship.component.path !== element.path
	);

	if (relationships.length === 0) return null;

	return (
		<div>
			<h3 className="!text-xl !font-extralight">{t("elements." + type, { count: 2 })}</h3>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
				{relationships.map((relationship: RelationshipInterface) => (
					<RelationshipComponent key={relationship.component.file.path} element={element} relationship={relationship} />
				))}
			</div>
		</div>
	);
}
