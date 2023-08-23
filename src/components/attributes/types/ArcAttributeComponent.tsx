import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { ArcType } from "src/data/enums/ArcType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function ArcAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	if (!attribute.isSet) return null;
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const [editing, setEditing] = React.useState<boolean>(false);

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	const saveAttribute = (arc: ArcType) => {
		codeblockService.updateCodeblockData(attribute.id, arc);
	};

	let content;

	if (editing) {
		content = Object.entries(ArcType)
			.filter(([key]) => isNaN(Number(key)))
			.map(([key]) => {
				const arcType = ArcType[key as keyof typeof ArcType];
				return (
					<div
						key={key}
						className="flex items-center border border-[--background-modifier-border] rounded-lg m-4 p-4 hover:bg-[--background-secondary] cursor-pointer"
						onClick={() => saveAttribute(arcType)}
					>
						<div className="flext min-w[50px] w-[50px] items-center justify-center">
							{attribute.value === arcType && (
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
									<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
								</svg>
							)}
						</div>
						<div>
							<h4 className="!m-0 !mb-2">{t("arc.arc", { context: arcType })}</h4>
							<small>
								<MarkdownComponent value={t("arc.description", { context: arcType })} />
							</small>
						</div>
					</div>
				);
			});
	} else if (isEditable) {
		content = (
			<div
				onClick={() => setEditing(!editing)}
				className="border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md p-3 cursor-pointer"
			>
				{attribute.value && (
					<>
						<div className="!mb-2">{t("arc.arc", { context: attribute.value })}</div>
						<small>
							<MarkdownComponent value={t("arc.description", { context: attribute.value })} />
						</small>
					</>
				)}
			</div>
		);
	} else {
		content = (
			<div className="border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md p-3 cursor-pointer">
				{attribute.value && (
					<>
						<div className="!mb-2">{t("arc.arc", { context: attribute.value })}</div>
						<small>
							<MarkdownComponent value={t("arc.description", { context: attribute.value })} />
						</small>
					</>
				)}
			</div>
		);
	}

	return (
		<>
			<AttributeTitleComponent attribute={attribute} />
			{content}
		</>
	);
}
