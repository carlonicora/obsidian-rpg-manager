import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function CustomAttributeListComponent({
	campaign,
	setAttribute,
	setNewAttribute,
}: {
	campaign: ElementInterface;
	setAttribute: (attribute: AttributeInterface) => void;
	setNewAttribute: (newAttribute: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const customAttributes: AttributeInterface[] = campaign.getCustomAttributes();

	return (
		<>
			<ul className="!p-0 !m-0 !mt-3 !mb-3">
				{customAttributes.map((attribute: AttributeInterface, index: number) => {
					return (
						<li
							key={index}
							className="text-[--text-normal] hover:text-[--text-accent] cursor-pointer"
							onClick={() => {
								setAttribute(attribute);
							}}
						>
							{attribute.customName ?? attribute.id}
						</li>
					);
				})}
			</ul>
			<button className="rpgm-secondary !ml-0 mb-3 mt-3" onClick={() => setNewAttribute(true)}>
				{t("buttons.newattribute")}
			</button>
		</>
	);
}
