import { createHash } from "crypto";
import React from "react";
import { useTranslation } from "react-i18next";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import AttributesComponent from "./AttributesComponent";

export default function ElementComponent({ element }: { element: Element }): React.ReactElement {
	const { t } = useTranslation();

	const attributes: Attribute[] = element.attributes.filter(
		(attribute: Attribute) => attribute.value !== undefined && attribute.id !== "Description"
	);
	const md5 = createHash("md5").update(JSON.stringify(attributes)).digest("hex");

	return (
		<div>
			<h1>{element.name}</h1>
			<h2>{t("Description")}</h2>
			<p>{element.attribute("Description").value ?? ""}</p>
			<AttributesComponent key={md5} element={element} />
		</div>
	);
}
