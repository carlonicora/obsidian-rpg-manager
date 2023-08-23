import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import RelationshipListComponent from "./RelationshipListComponent";

export default function RelationshipsComponent({ element }: { element: ElementInterface }): React.ReactElement {
	if (element.relationships.length === 0) return null;

	const { t } = useTranslation();

	return (
		<div>
			<h2 className="!m-0 !mb-3">{t("relationships.relationship", { count: 2 })}</h2>
			{Object.values(ElementType).map((type: ElementType) => {
				if (type === ElementType.Campaign || type === ElementType.Session || type === ElementType.Scene) return null;
				return <RelationshipListComponent key={type} element={element} type={type} />;
			})}
		</div>
	);
}
